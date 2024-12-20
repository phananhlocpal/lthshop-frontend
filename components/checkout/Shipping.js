'use client'
import React, { useState, useEffect } from 'react';
import { useUser } from "../../utils/hooks/useUser"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../../assets/icons/icons';
import useToggle from "../../utils/hooks/useUtil"
import axios from 'axios';
import GHN from "@/assets/icons/GHN.png";
import Image from 'next/image';

function Details({ onShippingFeeChange }) {
    const { currentUser } = useUser();
    const { toggle, isToggled } = useToggle(true);
    const token = "bae8ede9-be17-11ef-abe0-862d4f69d70f"

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [shippingFee, setShippingFee] = useState(null);

    // Lấy danh sách tỉnh
    useEffect(() => {
        axios
            .get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: { Token: token }
            })
            .then((response) => setProvinces(response.data.data))
            .catch((error) => console.error("Error fetching provinces:", error));
    }, []);

    // Lấy danh sách huyện khi chọn tỉnh
    useEffect(() => {
        if (selectedProvince) {
            axios
                .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
                    headers: { Token: token },
                    params: { province_id: selectedProvince }
                })
                .then((response) => setDistricts(response.data.data))
                .catch((error) => console.error("Error fetching districts:", error));
        }
    }, [selectedProvince]);

    // Lấy danh sách xã khi chọn huyện
    useEffect(() => {
        if (selectedDistrict) {
            axios
                .get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
                    headers: { Token: token },
                    params: { district_id: selectedDistrict }
                })
                .then((response) => setWards(response.data.data))
                .catch((error) => console.error("Error fetching wards:", error));
        }
    }, [selectedDistrict]);

    
    useEffect(() => {
        const fetchData = async () => {
            if (selectedProvince && selectedDistrict && selectedWard) {
                // Tìm tên tỉnh, huyện, xã
                console.log("Selected address:", selectedProvince, selectedDistrict, selectedWard);
                const provinceName = provinces.find((p) => Number(p.ProvinceID) === Number(selectedProvince))?.ProvinceName || '';
                const districtName = districts.find((d) => Number(d.DistrictID) === Number(selectedDistrict))?.DistrictName || '';
                const wardName = wards.find((w) => w.WardCode === selectedWard)?.WardName || '';
                setFullAddress(`${wardName}, ${districtName}, ${provinceName}`);
                
                try {
                    // Lấy gói dịch vụ từ API
                    const serviceResponse = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services', {
                        headers: { Token: token },
                        params: { 
                            shop_id: 946625,  // shop_id của bạn
                            from_district: 1787, // Mã huyện nơi gửi hàng
                            to_district: selectedDistrict // Mã huyện nơi nhận hàng
                        }
                    });
                    console.log("Available services:", serviceResponse.data.data);
    
                    // Kiểm tra nếu có dịch vụ và lấy service_id của dịch vụ đầu tiên
                    if (serviceResponse.data.data && serviceResponse.data.data.length > 0) {
                        const service = serviceResponse.data.data[0]; 
                        const serviceId = service.service_id;  
                        const request = {
                            from_district_id: 1787,  
                            service_id: serviceId,  
                            to_district_id: Number(selectedDistrict),
                            to_ward_code: selectedWard,
                            weight: 500,  
                            length: 10,  
                            width: 10,  
                            height: 5,  

                        }
                        console.log("Request:", request);
                        // Tiến hành gọi API tính phí giao hàng sau khi có serviceId
                        const feeResponse = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', request, {
                            headers: { Token: token }
                        });
    
                        setShippingFee(feeResponse.data.data.total);  
                        onShippingFeeChange(feeResponse.data.data.total); 
                    }
                } catch (error) {
                    console.error("Error fetching services or calculating shipping fee:", error);
                    setShippingFee(null);
                }
            } else {
                setFullAddress('');
                setShippingFee(null);
            }
        };
    
        fetchData(); // Gọi hàm bất đồng bộ
    
    }, [selectedProvince, selectedDistrict, selectedWard, onShippingFeeChange]);    

    return (
        <div className='shipping-content'>
            <div className='space-between'>
                <h1>SHIPPING ADDRESS</h1>
                <FontAwesomeIcon onClick={() => toggle()} icon={icons.edit}></FontAwesomeIcon>
            </div>
            <div className="line-divider"></div>
            <p>{currentUser?.firstName} {currentUser?.lastName}</p>
            <p>{fullAddress}</p>
            <p>Denmark</p>
            {isToggled() && <div>
                <div className="line-divider"></div>
                <div className="divider">
                    <label>
                        First Name
                        <input value={currentUser?.firstName} />
                    </label>
                    <label>
                        Last Name
                        <input value={currentUser?.lastName} />
                    </label>
                </div>
                <label>
                    Phone Number
                    <input value={currentUser?.phone} />
                </label>
                <div className='flex space-between'>
                    <label >
                        Province
                        <select className="ml-5" onChange={(e) => setSelectedProvince(e.target.value)}>
                            <option value="">Select Province</option>
                            {provinces.map((province) => (
                                <option key={province.ProvinceID} value={province.ProvinceID}>
                                    {province.ProvinceName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        District
                        <select className="ml-5"
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            disabled={!selectedProvince}
                        >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district.DistrictID} value={district.DistrictID}>
                                    {district.DistrictName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Ward
                        <select className="ml-5"
                            onChange={(e) => setSelectedWard(e.target.value)}
                            disabled={!selectedDistrict}
                        >
                            <option value="">Select Ward</option>
                            {wards.map((ward) => (
                                <option key={ward.WardCode} value={ward.WardCode}>
                                    {ward.WardName}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="line-divider"></div>
                {fullAddress ? (
                    <p>
                        <strong>Full Address:</strong> {fullAddress}
                    </p>
                ) : (
                    <p style={{ color: 'red' }}>Please select Province, District, and Ward to view the full address.</p>
                )}
                <div className="line-divider"></div>
                <div>
                    <div>
                        <div>
                            <Image src={GHN} alt="GHN" />
                            <strong>Giao Hàng Nhanh</strong>
                        </div>
                        {shippingFee !== null ? (
                            <p>
                                <strong>Shipping Fee:</strong> {shippingFee.toLocaleString()} VND
                            </p>
                        ) : (
                            <p style={{ color: 'red' }}>Shipping fee will be calculated after selecting address.</p>
                        )}
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Details;
