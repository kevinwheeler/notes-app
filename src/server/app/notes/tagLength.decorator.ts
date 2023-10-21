import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsTagLengthValid implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(tags: string[], args: ValidationArguments) {
    return tags.every((tag) => tag.length >= 1 && tag.length <= 50);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Each tag must be between 1 and 50 characters long.';
  }
}

export function TagLengthIsValid(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'tagLengthIsValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsTagLengthValid,
    });
  };
}
