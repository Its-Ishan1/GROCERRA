
import axios from 'axios';

const backendUrl = 'http://localhost:4000/api/user/login';

async function testLogin(email, password) {
    try {
        console.log(`Testing login for ${email} with password: ${password}`);
        const response = await axios.post(backendUrl, { email, password });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

async function runTests() {
    // 1. Existing user, wrong password
    await testLogin('ishan@123', 'wrongpassword');

    // 2. Non-existent user
    await testLogin('nonexistent@user.com', 'password');
}

runTests();
