import Action from "./Action"

export default class RandomAction extends Action {
  prepare = () => {
    throw new Error("You must implement 'prepare' to set the random output before a random action is executed")
  }
}