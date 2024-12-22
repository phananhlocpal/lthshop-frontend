import React from "react";

function ForgotPassword() {
  return (
    <section>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
           
      </a>
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight  md:text-2xl">
              Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                  <label for="email" className="block mb-2 text-sm font-medium ">Your email</label>
                  <input type="email" name="email" id="email" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.us" placeholder="name@company.com" required=""></input>
              </div>
              <div>
                  <label for="password" className="block mb-2 text-sm font-medium ">New Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.us" required=""></input>
              </div>
              <div>
                  <label for="confirm-password" className="block mb-2 text-sm font-medium">Confirm password</label>
                  <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.us" required=""></input>
              </div>
              <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></input>
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
          </form>
      </div>
  </div>
</section>
  );
}

export default ForgotPassword;
