import * as yup from "yup";
import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Customer } from "../entity/customer";

export class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer) {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          {
            abortEarly: false,
          }
        );
    } catch (error) {
      const err = error as yup.ValidationError;
      err.errors.forEach((error) => {
        entity.notification.addError({
          message: error,
          context: "Customer",
        });
      });
    }
  }
}
