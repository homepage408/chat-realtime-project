export const baseResponse = ({ success = true, message = "", data = [], token = '' }) => (res, statusCode = 200) => {
    const payload = {
        success: success,
        message: message,
        data: data,
        token
    }
    res.status(statusCode).json(payload);
    res.end;
}

export default baseResponse