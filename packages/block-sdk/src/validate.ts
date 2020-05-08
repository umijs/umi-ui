/**
 * validate assets schema
 */
import joi from '@hapi/joi';

/**
 * judge whether dumi assets
 * @param value
 */
export const isDumiAssets = value => {
  try {
    if (typeof value === 'string') {
      value = JSON.parse(value);
    }
    const schema = joi
      .object({
        assets: joi
          .object({
            examples: joi
              .array()
              .items(joi.object())
              .min(1)
              .required(),
          })
          .required(),
      })
      .unknown();
    const { error } = schema.validate(value);
    if (error) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};
