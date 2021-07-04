import useDocumentTitle from "@hooks/useDocumentTitle";
import SignupScreen from "@components/screens/signup";

const Signup = () => {
  useDocumentTitle("Please signup");
  return <SignupScreen />;
};

export default Signup;
