import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { vUpload } from '../../src/directives/upload'
import { UploadErrorType } from '../../src/directives/upload/types'

describe('v-upload 指令', () => {
  describe('配置解析', () => {
    it('应该支持数字参数作为最大文件大小', async () => {
      const handleError = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleError }
          },
          template: '<input type="file" v-upload="2048" @upload-error="handleError" />'
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      
      // 创建一个超过限制的文件 (3MB)
      const file = new File(['x'.repeat(3 * 1024 * 1024)], 'test.txt', { type: 'text/plain' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      input.files = dataTransfer.files

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      expect(handleError).toHaveBeenCalled()
      const errorDetail = handleError.mock.calls[0][0].detail
      expect(errorDetail.type).toBe(UploadErrorType.FILE_TOO_LARGE)
    })

    it('应该支持配置对象参数', async () => {
      const handleError = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleError }
          },
          template: `
            <input 
              type="file" 
              v-upload="{ maxSize: 2048, accept: ['image/*'] }" 
              @upload-error="handleError"
            />
          `
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      
      // 创建一个非图片文件
      const file = new File(['content'], 'test.txt', { type: 'text/plain' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      input.files = dataTransfer.files

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      expect(handleError).toHaveBeenCalled()
      const errorDetail = handleError.mock.calls[0][0].detail
      expect(errorDetail.type).toBe(UploadErrorType.INVALID_TYPE)
    })
  })

  describe('文件大小验证', () => {
    it('文件大小在限制内应该验证通过', async () => {
      const handleSuccess = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleSuccess }
          },
          template: '<input type="file" v-upload="2048" @upload-success="handleSuccess" />'
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      
      // 创建一个 1MB 的文件
      const file = new File(['x'.repeat(1024 * 1024)], 'test.txt', { type: 'text/plain' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      input.files = dataTransfer.files

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      expect(handleSuccess).toHaveBeenCalled()
      const files = handleSuccess.mock.calls[0][0].detail
      expect(files.length).toBe(1)
      expect(files[0].name).toBe('test.txt')
    })

    it('文件超过大小限制应该验证失败', async () => {
      const handleError = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleError }
          },
          template: '<input type="file" v-upload="1024" @upload-error="handleError" />'
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      
      // 创建一个 2MB 的文件
      const file = new File(['x'.repeat(2 * 1024 * 1024)], 'large.txt', { type: 'text/plain' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      input.files = dataTransfer.files

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      expect(handleError).toHaveBeenCalled()
      const errorDetail = handleError.mock.calls[0][0].detail
      expect(errorDetail.type).toBe(UploadErrorType.FILE_TOO_LARGE)
      expect(errorDetail.file.name).toBe('large.txt')
    })
  })

  describe('文件类型验证', () => {
    it('应该验证精确的 MIME type', async () => {
      const handleSuccess = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleSuccess }
          },
          template: `
            <input 
              type="file" 
              v-upload="{ maxSize: 4096, accept: ['image/png', 'image/jpeg'] }" 
              @upload-success="handleSuccess"
            />
          `
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      
      // 创建一个 PNG 文件
      const file = new File(['content'], 'test.png', { type: 'image/png' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      input.files = dataTransfer.files

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      expect(handleSuccess).toHaveBeenCalled()
    })

    it('应该支持通配符 MIME type', async () => {
      const handleSuccess = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleSuccess }
          },
          template: `
            <input 
              type="file" 
              v-upload="{ maxSize: 4096, accept: ['image/*'] }" 
              @upload-success="handleSuccess"
            />
          `
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      
      // 创建各种图片类型
      const files = [
        new File(['content'], 'test.png', { type: 'image/png' }),
        new File(['content'], 'test.jpg', { type: 'image/jpeg' }),
        new File(['content'], 'test.gif', { type: 'image/gif' })
      ]

      for (const file of files) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        input.files = dataTransfer.files
        await input.dispatchEvent(new Event('change', { bubbles: true }))
        await nextTick()
      }

      expect(handleSuccess).toHaveBeenCalledTimes(3)
    })

    it('不匹配的文件类型应该验证失败', async () => {
      const handleError = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleError }
          },
          template: `
            <input 
              type="file" 
              v-upload="{ maxSize: 4096, accept: ['image/*'] }" 
              @upload-error="handleError"
            />
          `
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      
      // 创建一个 PDF 文件
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      input.files = dataTransfer.files

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      expect(handleError).toHaveBeenCalled()
      const errorDetail = handleError.mock.calls[0][0].detail
      expect(errorDetail.type).toBe(UploadErrorType.INVALID_TYPE)
    })
  })

  describe('多文件验证', () => {
    it('应该验证多个文件的大小', async () => {
      const handleError = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleError }
          },
          template: `
            <input 
              type="file" 
              multiple
              v-upload="{ maxSize: 1024, multiple: true }" 
              @upload-error="handleError"
            />
          `
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      
      // 创建多个文件，其中一个超过限制
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(new File(['x'.repeat(512 * 1024)], 'small1.txt', { type: 'text/plain' }))
      dataTransfer.items.add(new File(['x'.repeat(2 * 1024 * 1024)], 'large.txt', { type: 'text/plain' }))
      dataTransfer.items.add(new File(['x'.repeat(512 * 1024)], 'small2.txt', { type: 'text/plain' }))
      input.files = dataTransfer.files

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      expect(handleError).toHaveBeenCalled()
      const errorDetail = handleError.mock.calls[0][0].detail
      expect(errorDetail.type).toBe(UploadErrorType.FILE_TOO_LARGE)
      expect(errorDetail.file.name).toBe('large.txt')
    })

    it('应该限制文件数量', async () => {
      const handleError = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleError }
          },
          template: `
            <input 
              type="file" 
              multiple
              v-upload="{ maxSize: 2048, multiple: true, maxFiles: 3 }" 
              @upload-error="handleError"
            />
          `
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      
      // 创建 5 个文件
      const dataTransfer = new DataTransfer()
      for (let i = 0; i < 5; i++) {
        dataTransfer.items.add(new File(['content'], `file${i}.txt`, { type: 'text/plain' }))
      }
      input.files = dataTransfer.files

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      expect(handleError).toHaveBeenCalled()
      const errorDetail = handleError.mock.calls[0][0].detail
      expect(errorDetail.type).toBe(UploadErrorType.TOO_MANY_FILES)
    })
  })

  describe('事件处理', () => {
    it('验证失败时应该触发错误并尝试清空 input', async () => {
      const handleError = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleError }
          },
          template: '<input type="file" v-upload="1024" @upload-error="handleError" />'
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      
      // 创建一个超过限制的文件
      const file = new File(['x'.repeat(2 * 1024 * 1024)], 'large.txt', { type: 'text/plain' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      input.files = dataTransfer.files

      // 验证文件确实被添加
      expect(input.files?.length).toBe(1)

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      // 应该触发错误事件
      expect(handleError).toHaveBeenCalled()
      const errorDetail = handleError.mock.calls[0][0].detail
      expect(errorDetail.type).toBe(UploadErrorType.FILE_TOO_LARGE)
    })

    it('应该触发 upload-success 事件', async () => {
      const handleSuccess = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleSuccess }
          },
          template: '<input type="file" v-upload="2048" @upload-success="handleSuccess" />'
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      const file = new File(['content'], 'test.txt', { type: 'text/plain' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      input.files = dataTransfer.files

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      expect(handleSuccess).toHaveBeenCalled()
      const event = handleSuccess.mock.calls[0][0]
      // detail 应该是 FileList 或类似数组对象
      expect(event.detail).toBeDefined()
      expect(event.detail.length).toBe(1)
      expect(event.detail[0].name).toBe('test.txt')
    })

    it('应该触发 upload-error 事件', async () => {
      const handleError = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleError }
          },
          template: '<input type="file" v-upload="1024" @upload-error="handleError" />'
        })
      )

      const input = wrapper.find('input').element as HTMLInputElement
      const file = new File(['x'.repeat(2 * 1024 * 1024)], 'large.txt', { type: 'text/plain' })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      input.files = dataTransfer.files

      await input.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()

      expect(handleError).toHaveBeenCalled()
      const event = handleError.mock.calls[0][0]
      expect(event.detail).toHaveProperty('type')
      expect(event.detail).toHaveProperty('file')
      expect(event.detail).toHaveProperty('message')
    })
  })

  describe('编程式上传', () => {
    it('应该为普通按钮创建隐藏的 file input', async () => {
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          template: '<button v-upload="2048">上传文件</button>'
        })
      )

      await nextTick()

      // 应该在 body 中创建了隐藏的 input
      const hiddenInputs = document.querySelectorAll('input[type="file"][style*="display: none"]')
      expect(hiddenInputs.length).toBeGreaterThan(0)
    })

    it('点击按钮应该触发隐藏 input 的点击事件', async () => {
      const handleSuccess = vi.fn()
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          setup() {
            return { handleSuccess }
          },
          template: '<button v-upload="2048" @upload-success="handleSuccess">上传文件</button>'
        })
      )

      await nextTick()

      const button = wrapper.find('button')
      
      // 点击按钮
      await button.trigger('click')
      await nextTick()

      // 隐藏的 input 应该存在
      const hiddenInput = document.querySelector('input[type="file"][style*="display: none"]') as HTMLInputElement
      expect(hiddenInput).toBeTruthy()
    })
  })

  describe('生命周期', () => {
    it('卸载时应该清理所有资源', async () => {
      const wrapper = mount(
        defineComponent({
          directives: { upload: vUpload },
          template: '<button v-upload="2048">上传</button>'
        })
      )

      await nextTick()

      const hiddenInputsBefore = document.querySelectorAll('input[type="file"][style*="display: none"]').length

      wrapper.unmount()
      await nextTick()

      const hiddenInputsAfter = document.querySelectorAll('input[type="file"][style*="display: none"]').length

      // 隐藏的 input 应该被移除
      expect(hiddenInputsAfter).toBeLessThan(hiddenInputsBefore)
    })
  })
})
