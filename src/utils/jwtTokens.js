

export const sendToken=(user, statusCode, message, res)=>{
    const token = user.getJWTToken();
    const option= {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production'
    };
    console.log('JWT_EXPIRES:', process.env.JWT_EXPIRES);
    console.log('COOKIE_EXPIRES:', process.env.COOKIE_EXPIRES);

    res.status(statusCode).cookie("token", token, option).json({
        success: true,
        message,
        token,
        user
    })
}