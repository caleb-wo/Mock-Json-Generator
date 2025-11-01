import * as rl from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export class MockDataAssembler {
  static prepareReader(): rl.Interface {
    return rl.createInterface({ input, output });
  }
  
  keys: Set<string> = new Set();
  values: Map<string, any> = new Map();

  private askQuestion(query: string): Promise<string>{
    let reader = MockDataAssembler.prepareReader();
    return new Promise((resolve) => {
        reader.question(query, (ans)=>{
          resolve(ans)
        });
    });
    reader.close()
  }

  async getKeys(set = this.keys): Promise<void> {
    while (true) {
      const rawKey = await this.askQuestion(
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
  }

  async getValues(keys = this.keys, values = this.values): Promise<void> {
    for (const key of keys) {
      const answer = await this.askQuestion(`Enter value for ${key}`);
      
      values.set(key, answer);
    }
  }
}

// enum MockString {
//   word,
//   sentence,
//   paragraph,
//   essay,
// }

// enum MockNumber {
//   small,
//   medium,
//   large,
//   huge,
// }
