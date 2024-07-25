import * as yup from 'yup';

export const customerSchema = yup.object().shape({
    firstName: yup.string().required('First Name is Required'),
    lastName: yup.string().required('Last Name is Required'),
    email: yup.string().email('Invalid Email Format').required('Email Address is Required'),
    contactNumber: yup.string().required('Phone Number is Required'),
    homeAddress: yup.string().required('Home Address is Required'),
    password: yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>_-]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    termsAndConditions: yup.bool().oneOf([true], 'Please agree to the Terms and Conditions to proceed'),

});


export const userSchema = yup.object().shape({
  firstName: yup.string().required('First Name is Required'),
  lastName: yup.string().required('Last Name is Required'),
  email: yup.string().email('Invalid Email Format').required('Email Address is Required'),
  contactNumber: yup.string().required('Phone Number is Required'),
  homeAddress: yup.string().required('Home Address is Required'),
  password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>_-]/,
      "Password must contain at least one symbol"
    )
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  termsAndConditions: yup.bool().oneOf([true], 'Please agree to the Terms and Conditions to proceed'),
  vehicleModel: yup.string().required('Vehicle Model is Required'),
  plateNumber: yup.string().required('Plate Number is Required'),
  vehicleType: yup.string().required('Vehicle Type is Required'),
  vehicleColor: yup.string().required('Vehicle Color is Required'),
  licenseNumber: yup.string().required('License Number is Required'),
  expirationDate: yup.string().required('Expiration Date is Required')
  // vpdlImage: yup.mixed().required('Valid Professional Driver\'s License is Required'),
  // certRegImage: yup.mixed().required('Certificate of Registration (CR) is Required'),
  // ORImage: yup.mixed().required('Official Receipt of Vehicle Registration (OR) is Required'),
});

export const complaintSchema = yup.object().shape({
  trackingNumber: yup.string().required('Tracking Number is Required'),
  typeOfComplaint: yup.string().required('Type of Complaint is Required'),
  complaintDescription: yup.string().required('Complaint Description is Required'),
});
