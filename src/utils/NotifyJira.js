import { notification } from 'antd';

export const notifyFunc = (type, title, decs) => notification[type]({
    message: title,
    description: decs,
});
