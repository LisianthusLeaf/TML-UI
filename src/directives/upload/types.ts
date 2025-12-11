/**
 * 上传指令类型定义
 */

/**
 * 上传错误类型枚举
 */
export enum UploadErrorType {
  /** 文件过大 */
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  /** 文件类型不匹配 */
  INVALID_TYPE = 'INVALID_TYPE',
  /** 文件数量超过限制 */
  TOO_MANY_FILES = 'TOO_MANY_FILES'
}

/**
 * 上传错误信息
 */
export interface UploadError {
  /** 错误类型 */
  type: UploadErrorType
  /** 出错的文件 */
  file: File
  /** 错误消息 */
  message: string
}

/**
 * 上传配置选项
 */
export interface UploadOptions {
  /** 最大文件大小（KB） */
  maxSize?: number
  /** 接受的文件类型（MIME types），支持通配符如 image/* */
  accept?: string[]
  /** 是否允许多选 */
  multiple?: boolean
  /** 最大文件数量 */
  maxFiles?: number
}

/**
 * upload-success 事件的 detail 类型
 */
export type UploadSuccessEventDetail = FileList

/**
 * upload-error 事件的 detail 类型
 */
export type UploadErrorEventDetail = UploadError
