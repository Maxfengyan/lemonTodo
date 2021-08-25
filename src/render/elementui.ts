import {
  ElTooltip,
  ElScrollbar,
  ElDialog,
  ElButton,
  ElTimeline,
  ElTimelineItem,
  ElCard,
  ElRow,
  ElCol,
  ElTag,
} from "element-plus";
// import "dayjs/locale/zh-cn";
// import lang from "@/plugin/language/zh-cn";
// 设置语言
// locale(lang);

const useElementUi = (app: any) => {
  app.component(ElTooltip.name, ElTooltip);
  app.component(ElScrollbar.name, ElScrollbar);
  app.component(ElDialog.name, ElDialog);
  app.component(ElButton.name, ElButton);
  app.component(ElTimeline.name, ElTimeline);
  app.component(ElTimelineItem.name, ElTimelineItem);
  app.component(ElCard.name, ElCard);
  app.component(ElRow.name, ElRow);
  app.component(ElCol.name, ElCol);
  app.component(ElTag.name, ElTag);
};

export default useElementUi;
