import { types, getParent } from "mobx-state-tree";
import { isEmpty, isEmail, isURL } from "validator";

export default types
  .model("Request")
  .props({
    name: types.maybe(types.enumeration(["valid", "invalid"])),
    email: types.maybe(types.enumeration(["valid", "invalid"])),
    url: types.maybe(types.enumeration(["valid", "invalid"])),
    type: types.maybe(types.enumeration(["valid", "invalid"])),
    traffic: types.maybe(types.enumeration(["valid", "invalid"])),
  })
  .views(self => ({
    get validations() {
      return getParent(self, 1);
    },
    get request() {
      return getParent(self, 2).request;
    },
    get nameIsValid() {
      return !isEmpty(self.request.name);
    },
    get emailIsValid() {
      return isEmail(self.request.email);
    },
    get urlIsValid() {
      return isURL(self.request.url);
    },
    get typeIsValid() {
      return !isEmpty(self.request.type);
    },
    get trafficIsValid() {
      return !isEmpty(self.request.traffic);
    },
  }))
  .actions(self => ({
    clear(field) {
      self.validations.clear("request", field);
    },
    validate(field) {
      return self.validations.validate("request", field);
    },
    validateAll() {
      return self.validations.validateAll("request");
    },
  }));
