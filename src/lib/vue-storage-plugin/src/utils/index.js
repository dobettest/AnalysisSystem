export const createSchema = fn => fn(import('joi'));
export const validate = (obj, schema) => {
    try {
        return schema.attempt(obj)
    } catch (error) {
        return false;
    }
}