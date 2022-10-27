import seeder from "./_seederMap.js";

const action = process.argv[2] || null;
const target = process.argv[3] || null;
const targetList = Object.keys(seeder);
const action_list = ["--clear", "--upload", "-c", "-u"];
const errorMessage = `
    This command is expecting arguments:
    Action: (-clear or -upload),
    Target:  _seederMap.key which is the given in _seederMap.js";
    complete example usage: node -clear bootcamp
    `.red;

const check_action = (target) => {
  if (targetList.includes(target)) {
    return true;
  }
  return false;
};

if (action_list.includes(action)) {
  if (["-c", "--clear"].includes(action) && check_action(target)) {
    Promise.resolve(seeder[target].deleteSeeds());
  } else if (["-u", "--upload"].includes(action) && check_action(target)) {
    Promise.resolve(seeder[target].createSeeds());
  } else {
    throw new Error(
      `${target}  is not found in _seederMap.js please check and try again`.red
    );
  }
} else {
  throw new Error(errorMessage);
}
