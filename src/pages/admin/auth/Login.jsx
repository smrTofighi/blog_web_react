import { useContext, useState } from "react";
import { AuthService } from "./service/AuthService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import Input from "../../../components/inputs/Input";
import AuthTile from "./components/AuthTile";
import AuthImage from "./components/AuthImage";
import AuthSwitchPrompt from "./components/AuthSwitchPrompt";
const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser, setOpenAuthForm } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user, role } = await AuthService.login({ email, password });
      setError("");
      updateUser(user);

      // Redirect based on role
      if (role === 1 || role === 2) {
        setOpenAuthForm(false);
        navigate("/admin/dashboard");
      }
      setOpenAuthForm(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col jusfy-center">
        <AuthTile
          title={"Welcome Back"}
          description={"Please enter your details to login"}
        />

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="example@gmail.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Min 8 Characters"
            label="Password"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <AuthSwitchPrompt
            promptText={"Don't have an account? "}
            actionText={"SignUp"}
            onActionClick={() => setCurrentPage("signup")}
          />
        </form>
      </div>
      <AuthImage />
    </div>
  );
};

export default Login;
