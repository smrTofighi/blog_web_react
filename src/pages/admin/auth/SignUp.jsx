import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import Input from "../../../components/inputs/Input";
import ProfilePhotoSelector from "../../../components/inputs/ProfilePhotoSelector";
import AuthImage from "./components/AuthImage";
import AuthTile from "./components/AuthTile";
import AuthSwitchPrompt from "./components/AuthSwitchPrompt";
import { AuthService } from "./service/AuthService";
const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAccessToken, setAdminAccessToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser, setOpenAuthForm } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { user, role } = await AuthService.signup(
        fullName,
        email,
        password,
        profilePic,
        adminAccessToken
      );

      updateUser(user);

      if (role === 1 || role === 2) {
        setOpenAuthForm(false);
        navigate("/admin/dashboard");
      }
      navigate("/");
      setOpenAuthForm(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again");
      }
    }
  };
  return (
    <div className="flex items-center h-auto md:h-[520]">
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col jusfy-center">
        <AuthTile
          title="Create an account"
          description="Join us today by entering your details blow"
        />

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Mohammad Rezaie"
              type="text"
            />
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
            <Input
              value={adminAccessToken}
              onChange={({ target }) => setAdminAccessToken(target.value)}
              placeholder="6 Digit Code"
              label="Admin Invite Token"
              type="number"
            />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            SIGNUP
          </button>
          <AuthSwitchPrompt
            promptText={"Already have an account?"}
            actionText={"Login"}
            onActionClick={() => setCurrentPage("login")}
          />
        </form>
      </div>
      <AuthImage />
    </div>
  );
};

export default SignUp;
