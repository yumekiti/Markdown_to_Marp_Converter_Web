import { FC, useState } from 'react';
import QRCode from 'qrcode.react';
import Modal from './Modal';

import ModalShareIcon from '../../assets/modalShare.svg';
import ExitIcon from '../../assets/exit.svg';

type Props = {
  url: string;
  setShare: (share: boolean) => void;
};

const Share: FC<Props> = ({ url, setShare }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Modal>
      <div className='h-4/6 flex justify-center items-center w-10/12 lg:w-4/12 md:w-6/12'>
        <div className='h-full w-full bg-cardBackground rounded-lg px-4 py-2 flex flex-col'>
          <div className='h-1/4 flex justify-between items-start'>
            <div className='flex justify-start items-center gap-2 m-2'>
              <img src={ModalShareIcon} alt='share' className='text-icons-stroke w-8 h-8' />
              <h1 className='text-headline text-2xl font-bold'>Share</h1>
            </div>
            <button className='text-icons-main rounded-md' onClick={() => setShare(false)}>
              <img src={ExitIcon} alt='exit' className='text-headline h-10 w-10 m-2' />
            </button>
          </div>
          <div className='h-3/4'>
            <div className='flex flex-col justify-center items-center'>
              <QRCode value={url} size={300} />
              <div className='w-10/12 mt-16 border rounded-md flex justify-between items-center'>
                <input className='rounded-l-md px-4 py-2 w-full' defaultValue={url} />
                <button
                  className='bg-icons-highlight text-icons-main rounded-r-md px-4 py-2 hover:opacity-80'
                  onClick={handleCopy}
                >
                  Copy
                </button>
              </div>
            </div>
            {copied && (
              <div className='flex justify-center items-center mt-4'>
                <p className='text-icons-tertiary'>Copied!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Share;
