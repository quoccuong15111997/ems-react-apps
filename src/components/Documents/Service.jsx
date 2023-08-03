export const duplicateService = (header, setHeader) => {
  setHeader({
    ...header,
    STTESIGN: 0,
    STTENAME: "",
    MAINCODE: "",
    MAINDATE: "",
    KKKK0000: "",
  });
};
