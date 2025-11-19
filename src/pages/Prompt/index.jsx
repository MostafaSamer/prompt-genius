import { Form, Input, PromptCard } from "../../shared/components";
import { Dropdown } from "../../shared/components/Dropdown/dropdown";
import { Header_Prompt } from "../../shared/components/Header_Prompt";
import styles from "./style.module.scss";

function Prompt() {
  return (
  <section className={styles.main_color}>
    <Header_Prompt/>
    <div className={styles.prompt}>
      <div>
        <div className={styles.box}>
          <h2>Configure Prompt</h2>
          <div>
            <p>Select a Prompt Template</p>
            <Input type="text" placeholder={"Instagram Post Generator"} />
          </div>
          <div className={styles.data_view}>
            <p>
              Your marketing team needs to create an Instagram post. The post
              should be written in a <span>{"{tone}"}</span> tone for an
              audience of {"{audience}"}. The topic of the post is {"{topic}"}
            </p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.box_header}>
            <div>
            <h2>Variables</h2>
            </div>
            <div>
            <p>Clear All</p>
            </div>
          </div>
          <div>
            <Input
              type="text"
              label={"tone"}
              placeholder={"e.g., professional, casual, humorous"}
              value={"playful and witty"}
            />
            <Input
              type="text"
              label={"audience"}
              placeholder={"e.g., young adults, tech enthusiasts"}
              value={"Gen Z dog owner"}
            />
            <Input
              type="textarea"
              label={"topic"}
              placeholder={"e.g., new product launch, holiday sale"}
              value={"The launch of a new line of organic dog treats"}
            />
          </div>
        </div>
      </div>

      <div className={styles.box}>
        <h2>Live Preview</h2>
        <div className={styles.box_special}>
          <p>
            Your marketing team needs to create an Instagram post. The post
            should be written in a playful and witty tone for an audience of Gen
            Z dog owners. The topic of the post is The launch of a new line of
            organic dog treats.
          </p>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Prompt;
