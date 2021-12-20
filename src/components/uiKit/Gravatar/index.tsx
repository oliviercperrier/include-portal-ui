import md5 from "md5";

const Gravatar = ({ email = "", d = "retro", size = 100, ...props }) => (
  <img
    src={`https://www.gravatar.com/avatar/${md5(
      email.trim().toLowerCase()
    )}?s=${size}&d=${d}`}
    alt="Gravatar"
    {...props}
  />
);

export default Gravatar;
