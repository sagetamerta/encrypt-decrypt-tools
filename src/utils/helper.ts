import CryptoJS from 'crypto-js'

interface encryptTextPayload {
  target_text: string
  encryption_key: string
  type: string
}

export const encryptText = (payload: encryptTextPayload) => {
    const { target_text, encryption_key } = payload
    const encrypted = CryptoJS.AES.encrypt(target_text, encryption_key).toString()

    return encrypted
}

export const decryptText = (payload: encryptTextPayload) => {
  try {
    const encrypted = payload.target_text
      .split('---')
      .join('/')
      .split('@@')
      .join('+')
      .split(' ')
      .join('+')
    const bytes = CryptoJS.AES.decrypt(encrypted, payload.encryption_key)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)

    return originalText
  } catch (error) {
    console.error('Error: ', error)
    return ''
  }
}