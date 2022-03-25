import joi from '@hapi/joi';
import { nanoid } from 'nanoid';
import store from '@/store';
const userID = store.getters['userInfo']['userID'];
export const folderValidator = joi.object({
    folderID: joi.string().default(nanoid()),
    folderName: joi.string().required(),
    creator: joi.string().default(userID),
    cdate: joi.date().default(Date.now()),
    files: joi.array()
})
export async function validate(validator, value) {
    try {
        return await validator.validateAsync(value);
    } catch (error) {
        let errStr = error['details'].reduce((str, next) => {
            return str.concat(next['message']);
        }, '');
        throw new Error(errStr);
    }
}