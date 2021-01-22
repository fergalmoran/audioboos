import { atom } from "recoil";

interface IEventState {
    
}
const eventState = atom({
  key: "bargle",
  default: [],
});

export default eventState;
