import pfp from "../images/pfp.png";

const users = [...Array(5).keys()].map((i) => ({
  id: `${i + 1}`,
  username: `username${i + 1}`,
  password: `password${i + 1}`,
  name: `User ${i + 1}`,
  img: pfp,
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In fermentum et sollicitudin ac orci phasellus egestas.",
  joinDate: `${1 + Math.floor(Math.random() * 30)}/${
    1 + Math.floor(Math.random() * 12)
  }/${17 + Math.floor(Math.random() * 6)}`,
  followers: Math.floor(Math.random() * 10000),
  following: Math.floor(Math.random() * 100),
}));

export default users;
