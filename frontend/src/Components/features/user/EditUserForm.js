import { useState, useEffect } from "react";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../../app/api/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../config/roles";
import { MenuItem } from "@mui/material";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const NAME_REGEX = /^[A-z\s]{3,20}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [validName, setValidName] = useState("");
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles("");
      setPhoneNumber("");
      navigate("/kelola-akun");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);
  const onRolesChanged = (e) => {
    setRoles(e.target.value);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({
        id: user.id,
        name,
        username,
        phoneNumber,
        password,
        roles,
        active,
      });
    } else {
      await updateUser({
        id: user.id,
        name,
        username,
        phoneNumber,
        roles,
        active,
      });
    }
  };
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <MenuItem key={role} value={role}>
        {role}
      </MenuItem>
    );
  });
  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  return <div></div>;
};

export default EditUserForm;
