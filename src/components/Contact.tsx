import Image from "next/image";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";
import { useRouter } from "next/router";
// import { eventTrack } from '../../utils/useAnalyticsEventTracker';
// import ReCAPTCHA from "react-google-recaptcha";

export interface IFormPost {  
  name?:    string;
  email?:   string;
  message?: string;
}


const Contact = () => {
  
  const router =                              useRouter();
  const form =                                useRef<HTMLFormElement | null>(null)
  const [formData, setFormData] =             useState<IFormPost>()
  const [openContact, setOpenContact] =       useState<boolean>(false)
  const [sendCheck, setSendCheck] =           useState<boolean>(false)
  const [sendCheckValid, setSendCheckValid] = useState<boolean>(false)
  const [sendCheckError, setSendCheckError] = useState<boolean>(false)
  // const recaptchaRef = useRef<ReCAPTCHA>()

  const handleContact = () => {
    setOpenContact(!openContact)
  }


  const sendEmail = (e: any) => {
    e.preventDefault()
    setSendCheck(true)
    const resetForm = e.target as HTMLFormElement;
    emailjs.sendForm('service_9p86mok', 'template_z6jbpjq', e.target, 'ittbXHEclFdLS1CCB')
    .then(({result}: any) => {
      setTimeout(() => {
          setSendCheck(true)
          setSendCheckValid(true)
          setFormData({name:'', email:'',message:'' })
          resetForm.reset();
      }, 2000);
    }, ({error}: any) => {
      setTimeout(() => {
        setSendCheck(false)
        setSendCheckError(true)
      }, 1000);
      });
  };


  
  return (
    <div id="Contact">

      <div className="OpenContact__Btn" 
        onClick={() => handleContact()}>
        <Image src={`${router.basePath}/media/Contact.svg`} 
            alt={'contact'}
            priority
            height={35}
            width={35}
          />
      </div>

      {openContact &&
        <div className={`Contact__Form ${openContact && 'ContactOpen__Animate'}`}>
          <div className="ContactForm__Header">
            <Image src={`${router.basePath}/media/Contact.svg`} 
              alt={'contact'}
              priority
              height={40}
              width={40}
            />
            <span>Contact</span>
            <svg className="CloseContact__Btn" onClick={() => handleContact()} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio='none' viewBox="0 0 100 100">
              <path className="st110" d="M91.75,15.69L15.69,91.75c-2.06,2.06-5.39,2.06-7.44,0l0,0c-2.06-2.06-2.06-5.39,0-7.44L84.31,8.25
                c2.06-2.06,5.39-2.06,7.44,0l0,0C93.81,10.3,93.81,13.63,91.75,15.69z"/>
              <path className="st111" d="M84.31,91.75L8.25,15.69c-2.06-2.06-2.06-5.39,0-7.44l0,0c2.06-2.06,5.39-2.06,7.44,0l76.07,76.07
                c2.06,2.06,2.06,5.39,0,7.44l0,0C89.7,93.81,86.37,93.81,84.31,91.75z"/>
            </svg>
          </div>
          <div className="ContactForm__Body">

            <form ref={form} onSubmit={(e) => sendEmail(e)}>
              <input onChange={(e) => setFormData({...formData , name: e.currentTarget.value})} id='firstname' name="client_name" placeholder="name" minLength={3} maxLength={20} required/>
              <input onChange={(f) => setFormData({...formData ,email: f.currentTarget.value})} type="email" name="client_email" placeholder="email" maxLength={30} required/>
              <textarea onChange={(g) => setFormData({...formData ,message: g.currentTarget.value})} name="client_message" placeholder="message..." maxLength={180} required/>
                            
              <div className="g-recaptcha"></div>

              {sendCheck ? 
                !sendCheckValid ? 
                  <div className="lds-facebook"><div></div><div></div><div></div></div> 
                  : <p>Message Envoyé</p>
                : <button type='submit'>{sendCheckError ? 'Réessayer' : 'Envoyer'}</button>
                }
            </form>
          </div>
        </div>
      }
    </div>
  );
}
export { Contact };
