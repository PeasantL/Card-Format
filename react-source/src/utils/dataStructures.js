//Current implement fields for the settings

//Todo -> seperate dataFormat
export const jsonCardFormat = {
  alternate_greetings: [],
  avatar: "",
  character_version: "",
  creator: "",
  creator_notes: "",
  description: "",
  extensions: [],
  first_mes: "",
  mes_example: "",
  name: "",
  personality: "",
  post_history_instructions: "",
  scenario: "",
  system_prompt: "",
  tags: [],
};

//Tags should be shown as badges -> See chub.ai and bootstrap react badges
export const jsonCardCategories = {
  defaultSetting: ["alternate_greetings", "first_mes", "mes_example"],
  addSetting: [
    "description",
    "name",
    "personality",
    "post_history_instructions",
    "scenario",
    "system_prompts",
  ],
  miscSettings: ["avatar", "creator", "creator_notes"],
  tags: "tags",
};
