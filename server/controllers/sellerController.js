
import jwt from 'jsonwebtoken';
//login seller:/api/seller/login


export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('SellerToken', token, {
        httpOnly: true, // prevent js to access cookie
        secure: process.env.NODE_ENV === 'production',//use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // csrf protection 
      });

      return res.json({ success: true, message: 'Logged in' });


    } else {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }

  } catch (error) {

    console.log(error.message);
    res.json({ success: false, message: error.message });

  }

}
//seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    const token = req.cookies.SellerToken;

    if (!token) {
      return res.json({ success: false });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false });
  }
};


// Logout Seller : /api/seller/logout

export const sellerlogout = async (req, res) => {
  try {

    res.clearCookie('SellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.json({ success: true, message: "Logged Out" })
  } catch (error) {

    console.log(error.message)
    res.json({ success: false, message: error.message });

  }
}
