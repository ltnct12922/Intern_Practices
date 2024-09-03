import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8081"

    static async login(email, password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password})
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async register(userData, token){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData
        , {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    // just add & it's wrong sth in header
    static async userreg(userData) {
        try {
            const response = await axios.post(
                `${UserService.BASE_URL}/auth/user-reg`, 
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Uncomment this if the API requires a token for registration
                        // 'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (err) {
            // Logging the error for debugging
            console.error("Error registering user:", err.response?.data || err.message);
            
            // Specific handling for 403 error
            if (err.response && err.response.status === 403) {
                alert("Access is forbidden: You might not have the required permissions.");
            } else {
                alert("An error occurred: Some of your information might be duplicated.");
            }
            
            // Throwing the error to keep it manageable further up the stack if needed
            throw err;
        }
    }
    

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    //Reset Password Function
    static async requestPasswordReset(email) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/forgotPassword/verifyMail/${email}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }   

    // Verify OTP
    static async verifyOtp(otp, email) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/forgotPassword/verifyOtp/${otp}/${email}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Change Password
    static async resetPassword(email, newPassword, repeatPassword) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/forgotPassword/changePassword/${email}`, {
                password: newPassword,
                repeatPassword: repeatPassword
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        
        
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }



}

export default UserService;