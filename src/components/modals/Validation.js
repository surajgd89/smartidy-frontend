

export default function Validation({ values }) {
   const errors = {};

   var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
   if (!pattern.test(amount)) {
      errors.amount = "Please enter number only";
   } else if (amount.length > 5) {
      errors.amount = "Please enter only 4 digit amount.";
   } else {
      setIsValidAmount(true)
      setAmountError("");
   }

}
