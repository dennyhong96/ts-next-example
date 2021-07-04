import useDocumentTitle from "@hooks/useDocumentTitle";
import LoginScreen from "@components/screens/login";

const Login = () => {
  useDocumentTitle("Please login");
  return <LoginScreen />;
};

export default Login;
