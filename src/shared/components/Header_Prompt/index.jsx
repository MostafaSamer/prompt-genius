import style from "./style.module.scss";
import { Copy, Sparkles } from "lucide-react";
export const Header_Prompt = () => {
  return (
    <header>
      <div className={style.Header_Prompt}>
        <div className={style.Logo}>
          <span>◆</span>
          <div>Prompt Editor</div>
        </div>
        <div>
          <ul>
            <li>My Prompts</li>
            <li>Settings</li>
            <li>
              <button className={style.copy}>
                <span>

                <Copy size={14}/>
                </span>
                Copy
              </button>
            </li>
            <li>
              <button className={style.generate} >
                <span>
                <Sparkles size={16}  />
                </span>
                Generate via AI
              </button>
            </li>
          </ul>
        </div>
      </div>
      <hr/>
    </header>
  );
};
