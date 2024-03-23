import SEO from '@/components/seo'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import clsx from 'clsx'
import { decryptText, encryptText } from '@/utils/helper'
import CopyToClipboard from 'react-copy-to-clipboard'
import { IconCopy } from '@tabler/icons-react'
import toast from 'react-hot-toast'
import CreatorFooter from '@/components/footer/CreatorFooter'
import Header from '@/components/header/Header'

const formSchema = Yup.object().shape({
  target_text: Yup.string().required('Target Text is required'),
  encryption_key: Yup.string().required('Encryption Key is required'),
  type: Yup.string().required('Type is required')
})

const modeOptions = [
  { value: 'encrypt', label: 'Encrypt' },
  { value: 'decrypt', label: 'Decrypt' }
]

const LandingPage = () => {
  const [outputText, setOutputText] = useState<string>('')

  const { watch, control, getValues, setValue, handleSubmit } = useForm({
    defaultValues: {
      target_text: '',
      encryption_key: '',
      type: 'encrypt'
    },
    resolver: yupResolver(formSchema)
  })

  const { type: typeForm } = watch()

  const getPayload = () => {
    const form = getValues()
    return {
      target_text: form.target_text,
      encryption_key: form.encryption_key,
      type: form.type
    }
  }

  const onSubmit = () => {
    const payload = getPayload()

    if (typeForm === 'encrypt') {
      const result = encryptText(payload)
      setOutputText(result)
    } else if (typeForm === 'decrypt') {
      const result = decryptText(payload)
      setOutputText(result)
    } else {
      console.error('Invalid type')
      return
    }
  }

  return (
    <>
      <SEO title="TextCrypt | Encryption and Decryption Tools" />
      <main className="flex flex-col justify-center items-center">
        <section className="min-w-[375px] md:min-w-[768px] p-4 md:p-8 rounded">
          <Header />
          {/* Toggle button encrypt or decrypt */}
          <div className="flex justify-between mb-8">
            {modeOptions.map((option) => {
              return (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setValue('type', option.value)}
                  className={clsx(
                    'w-full py-2 rounded',
                    typeForm === option.value
                      ? 'bg-blue-500 text-white hover:bg-blue-600 border border-blue-800'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300'
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="target_text"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="mb-4">
                  <label htmlFor="target_text" className="block mb-2">
                    Target Text
                  </label>
                  <textarea
                    {...field}
                    placeholder="Enter target text..."
                    className="custom-textarea w-full p-2 border rounded"
                  />
                  {error && (
                    <p className="text-red-500 text-sm">{error.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              name="encryption_key"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="mb-4">
                  <label htmlFor="encryption_key" className="block mb-2">
                    Encryption Key
                  </label>
                  <textarea
                    {...field}
                    placeholder="Enter encryption key..."
                    className="custom-textarea w-full p-2 border rounded"
                  />
                  {error && (
                    <p className="text-red-500 text-sm">{error.message}</p>
                  )}
                </div>
              )}
            />

            <button
              type="submit"
              className={clsx(
                'w-full py-2 mb-12 rounded',
                'bg-blue-500 text-white hover:bg-blue-600 border border-blue-800'
              )}
            >
              Generate Result
            </button>

            <div className={clsx('flex flex-col')}>
              <div
                className={clsx(
                  'flex flex-row items-center align-middle gap-2',
                  'py-2'
                )}
              >
                <p>Result Text</p>
                <CopyToClipboard
                  text={outputText}
                  onCopy={() =>
                    toast.success('Berhasil copy Output ke clipboard!')
                  }
                >
                  <button type="button" disabled={!outputText}>
                    <IconCopy className="w-4 h-4 dark:text-white text-black" />
                  </button>
                </CopyToClipboard>
              </div>
              <textarea
                className="custom-textarea w-full h-32 p-2 border rounded mb-4 relative"
                placeholder="Output..."
                readOnly
                value={outputText}
              />
            </div>
          </form>
        </section>

        {/* Footer */}
        <CreatorFooter />
      </main>
    </>
  )
}

LandingPage.layout = 'Blank'
export default LandingPage
