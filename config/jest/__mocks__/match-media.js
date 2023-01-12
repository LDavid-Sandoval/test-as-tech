import { jest } from '@jest/globals'

module.exports = Object.defineProperty(window, 'matchmedia', {
    writable: true,
})