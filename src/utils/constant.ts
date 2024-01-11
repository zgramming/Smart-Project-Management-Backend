export const prefixUrl = '/v1';
export const prefixSettingUrl = `${prefixUrl}/setting`;
export const prefixProjectUrl = `${prefixUrl}/project`;
export const prefixProjectClientUrl = `${prefixUrl}/project-client`;
export const prefixProjectMemberUrl = `${prefixUrl}/project-member`;
export const prefixProjectDocumentUrl = `${prefixUrl}/project-document`;
export const prefixProjectMeetingUrl = `${prefixUrl}/project-meeting`;
export const prefixProjectTaskUrl = `${prefixUrl}/project-task`;
export const prefixProjectTaskHistoryUrl = `${prefixUrl}/project-task-history`;
export const prefixProjectReportUrl = `${prefixUrl}/project-report`;

export const roleCode = {
  developer: 'DEVELOPER',
  projectManager: 'PROJECT_MANAGER',
  admin: 'ADMIN',
  owner: 'OWNER',
};

export const pathUploadDocument = 'uploads/document';
export const pathReportExcel = 'uploads/report';

export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
};

export const whitelistUrl = ['https://www.spm.my.id'];
