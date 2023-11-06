export const prefixUrl = '/v1';
export const prefixSettingUrl = `${prefixUrl}/setting`;
export const prefixProjectUrl = `${prefixUrl}/project`;
export const prefixProjectClientUrl = `${prefixUrl}/project-client`;
export const prefixProjectMemberUrl = `${prefixUrl}/project-member`;
export const prefixProjectDocumentUrl = `${prefixUrl}/project-document`;

export const pathUploadDocument = 'uploads/document';

export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
};
