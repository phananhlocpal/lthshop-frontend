import * as motion from "motion/react-client"

export default function ScrollTriggered() {
    return (
        <div style={container}>
            <h1 className="font-bold mb-8 text-center mt-8" style={{fontSize: '50px'}}>Best Seller LTH</h1>
            {food.map(([image, hueA, hueB], i) => (
                <Card key={i} i={i} image={image} hueA={hueA} hueB={hueB} />
            ))}
        </div>
    );
}

function Card({ image, hueA, hueB, i }) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >
            <div style={{ ...splash, background }} />
            <motion.div style={card} variants={cardVariants} className="card">
                <img
                    src={image}
                    alt={`food-${i}`}
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "10%",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}

const cardVariants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

/**
 * ==============   Styles   ================
 */

const container = {
    margin: "100px auto",
    maxWidth: 500,
    paddingBottom: 100,
    width: "100%",
};

const cardContainer = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -120,
};

const splash = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
};

const card = {
    fontSize: 164,
    width: 300,
    height: 430,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    background: "#f5f5f5",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%",
};

/**
 * ==============   Data   ================
 */

const food = [
    ["https://res.cloudinary.com/dahzoj4fy/image/upload/v1734742500/e5hcuwc2o1wryb6vyhtr.webp", 340, 10],
    ["https://res.cloudinary.com/dahzoj4fy/image/upload/v1734742393/k3etrkghojimcd7vfz9c.webp", 20, 40],
    ["https://res.cloudinary.com/dahzoj4fy/image/upload/v1734742151/bnkewv4b5aenxdehqcaa.webp", 60, 90],
    ["https://res.cloudinary.com/dahzoj4fy/image/upload/v1734741745/h4koj8o7f5n1e9mfyrat.webp", 80, 120],
    ["https://res.cloudinary.com/dahzoj4fy/image/upload/v1734641567/hnthnzxhkukhqfhdtdpr.webp", 100, 140],
    ["https://res.cloudinary.com/dahzoj4fy/image/upload/v1734500908/xqlcshzjeqsphov9hfkj.webp", 205, 245],
    ["https://res.cloudinary.com/dahzoj4fy/image/upload/v1734500791/pkgpstorx0xuwbvbnd9u.webp", 260, 290],
    ["https://res.cloudinary.com/dahzoj4fy/image/upload/v1734500715/wqx8gdh6lp7hiss2xab2.webp", 290, 320],
];
