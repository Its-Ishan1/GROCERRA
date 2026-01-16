import jwt from 'jsonwebtoken'

const authSeller = async (req, res, next) => {

    const { SellerToken } = req.cookies;

    if (!SellerToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided"
        });
    }

    try {

        const tokenDecode = jwt.verify(SellerToken, process.env.JWT_SECRET)

        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();

        } else {
            return res.json({ success: false, message: 'Not Authorized' });
        }



    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}
export default authSeller;