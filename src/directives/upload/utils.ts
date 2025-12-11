/**
 * 上传指令工具函数
 */

import type { UploadOptions, UploadError } from './types'
import { UploadErrorType } from './types'

/**
 * 验证文件大小
 * @param file 文件对象
 * @param maxSize 最大文件大小（MB）
 * @returns 验证结果，成功返回 null，失败返回错误对象
 */
export function validateFileSize(file: File, maxSize: number): UploadError | null {
  const fileSizeInMB = file.size / (1024 * 1024)

  if (fileSizeInMB > maxSize) {
    return {
      type: UploadErrorType.FILE_TOO_LARGE,
      file,
      message: `文件 "${file.name}" 大小为 ${fileSizeInMB.toFixed(2)}MB，超过限制 ${maxSize}MB`
    }
  }

  return null
}

/**
 * 匹配 MIME type
 * @param fileType 文件的 MIME type
 * @param acceptType 接受的 MIME type，支持通配符如 image/*
 * @returns 是否匹配
 */
export function matchMimeType(fileType: string, acceptType: string): boolean {
  // 精确匹配
  if (fileType === acceptType) {
    return true
  }

  // 通配符匹配（如 image/*）
  if (acceptType.endsWith('/*')) {
    const baseType = acceptType.slice(0, -2)
    return fileType.startsWith(baseType + '/')
  }

  return false
}

/**
 * 验证文件类型
 * @param file 文件对象
 * @param accept 接受的文件类型列表
 * @returns 验证结果，成功返回 null，失败返回错误对象
 */
export function validateFileType(file: File, accept: string[]): UploadError | null {
  const isAccepted = accept.some(acceptType => matchMimeType(file.type, acceptType))

  if (!isAccepted) {
    return {
      type: UploadErrorType.INVALID_TYPE,
      file,
      message: `文件 "${file.name}" 类型为 ${file.type}，不在允许的类型列表中: ${accept.join(', ')}`
    }
  }

  return null
}

/**
 * 批量验证文件
 * @param files 文件列表
 * @param options 上传配置选项
 * @returns 验证结果，成功返回 null，失败返回第一个错误对象
 */
export function validateFiles(files: FileList | File[], options: UploadOptions): UploadError | null {
  const fileArray = Array.from(files)

  // 验证文件数量
  if (options.maxFiles !== undefined && fileArray.length > options.maxFiles) {
    return {
      type: UploadErrorType.TOO_MANY_FILES,
      file: fileArray[0],
      message: `最多只能选择 ${options.maxFiles} 个文件，当前选择了 ${fileArray.length} 个`
    }
  }

  // 验证每个文件
  for (const file of fileArray) {
    // 验证文件大小
    if (options.maxSize !== undefined) {
      const sizeError = validateFileSize(file, options.maxSize)
      if (sizeError) {
        return sizeError
      }
    }

    // 验证文件类型
    if (options.accept && options.accept.length > 0) {
      const typeError = validateFileType(file, options.accept)
      if (typeError) {
        return typeError
      }
    }
  }

  return null
}

/**
 * 解析指令绑定值为上传配置
 * @param value 指令绑定值，可以是数字或配置对象
 * @returns 解析后的配置对象
 */
export function parseUploadOptions(value: number | UploadOptions): UploadOptions {
  if (typeof value === 'number') {
    return { maxSize: value }
  }
  return value
}
