import * as rl from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export class MockDataAssembler {
  static prepareReader(): rl.Interface {
    return rl.createInterface({ input, output });
  }

  
  keys: Set<string> = new Set();
  values: Map<string, any> = new Map();

  async getKeys(set = this.keys): Promise<void> {
    let reader = MockDataAssembler.prepareReader();

    while (true) {
      const rawKey = await reader.question(
        "Enter a key (or 'done' to move on): ",
      );
      let key = rawKey.trim().toLowerCase();
      if (key === "done") break;

      if (set.has(key)) {
        console.log(`Key '${key}' already exists.`);
      } else {
        console.log(`Key '${key}' added.`);
        set.add(key);
      }
    }
    console.log("Keys added.");
    reader.close();
  }
}

enum MockString {
  word,
  sentence,
  paragraph,
  essay,
}

enum MockNumber {
  small,
  medium,
  large,
  huge,
}
