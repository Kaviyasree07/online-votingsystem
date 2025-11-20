import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginAnimated.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [captchaStage, setCaptchaStage] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [backendUser, setBackendUser] = useState(null);

  const navigate = useNavigate();

  // Generate captcha
  const generateCaptcha = () => {
    const random = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptcha(random);
  };

  // Step 1: verify email + password
  const handlePasswordLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      if (!res.data.success) {
        return alert("❌ Invalid email or password");
      }

      setBackendUser(res.data.user);
      generateCaptcha();
      setCaptchaStage(true);
    } catch (err) {
      alert("❌ Server error");
    }
  };

  // Step 2: verify captcha
  const handleCaptchaVerify = () => {
    if (captcha !== captchaInput) {
      alert("❌ Incorrect captcha");
      generateCaptcha();
      return;
    }

    localStorage.setItem("user", JSON.stringify(backendUser));
    navigate("/dashboard");
  };

  return (
    <div className="login-bg">

      {/* LEFT SIDE — QUOTES + ILLUSTRATION */}
      <div className="left-panel fadeIn">

        <h1 className="quote-main">
          “Your Vote Shapes The Nation.”
        </h1>

        <p className="quote-sub">
          Democracy thrives when YOU participate.  
          Every vote has the power to change the future.
        </p>

        <p className="quote-highlight">
          🇮🇳 <b>Your choice. Your responsibility. Your power.</b>
        </p>

        {/* New voting illustration */}
        {/* Your Vote Image */}
        <img 
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhURExIVERMWGRUVGBYVGBoVHhoXFhkXGhgWFRgaIyggGholHB0VLTEiJS0rLi4xGyEzOjMsNzQtLi8BCgoKDg0OGhAQGzAmHyU2LS0tLy0rLS0tLS0tLSsvKysrKystLystLS0vLS0wLSstLzctLSsrKy0tLS0tLS0tK//AABEIAKIBNgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQHAv/EAD8QAAICAQMCBAQEAwUIAgMBAAECAAMRBBIhBTEGEyJBMlFhcRQjgZEHQnIIUqGywRYkMzRic4KxY/BTkvEV/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EACsRAQEAAgEEAQMDAwUAAAAAAAABAhEDEiExQQQTIlEyYXEF4fFCkbHR8P/aAAwDAQACEQMRAD8A9YiInV4CIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICInn/8AFbxzd04UJQiM9u9i1gJAVNowFBHJJ7ntjtzxKuMtuo9AieF9M/iZ1jUB2popsCcsRWeO/wA35PB4E0U/xY6owyqaY+/wH6jtv47HvMfVx3Zvw7Y/G5MvEe9xPCdb/FDq9KLZbRSiP8JapueM4+Lg4wcH25ly/hT49u6i11V6IHrCurVgqCpOCGBJ5BxyJcc8cvDGXDlj5eiRETbmREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQE8T/tD/APF0f9F3+ZJ7ZPE/7Q//ABdH/Rd/mSZy8OnF+pz/AMCXDNqaG9xXYB/SWVv8yTHhDwwbtc+ns5r07N5nybY5VVI9gSB9wGlY/hp1b8Nq1szxkI3b4HypP2BKk/0z17rGuXR1avU18W3ENkjs+1UX7gHc36tPz/zMsuLnymPnkk1/Pj/h9/4/V9Pt/wC7vMf4t9UFmoFNbZqqLjg/Fbkb2J98H0j5bTJr+z3/AMzqf+0v+cTzLqWp3uecgcD6/M/cmem/2e/+Z1P/AGl/zifY+PxTiwxwnp835VluWnuURE9T5xERAREjtR17SoxR9TSjLwVaxQQfkQTxJbJ5awwyzusZb/CRic9Ovqes2paj1gEl1YMoC8nJHymrpPVatTX5tD+YmSucEYIxkEEAjuP3Ebi/Tzkt1dTte3h2xE5n6hULBSbUFpGRWWG4jBOQvc8A/tG2Zjb4jpiIlQiIgIiICIgwETEZhGYmIg2zExEG2YmIg2zExEG2Z8s4HJIH34mZGUGy5rAthq8vd8IGWPmWKPUewAQcfUyWt4Y9VSYMzI7T3FXKE7vg3HABzam5WbGBnKuuffKfWSESpnj03TMTESs7Znif9ob/AIuj/ou/zJPa55l/Gbwjqdb+Hs0yC01+YrJuVThtpDDcQCODn37fXEvh04rrLu8MTT2DDAHnsR/9+UsXVeva3VaUUWJmuohmcAhm25UbjnDYz7Dvid9PgfrCjA0hPp2jLVcAdv5vbn959f7F9Zxj8KfiDZ/JzkZx6s592/8A2Pznmz4+qy2Tc8Pp/U4ZNTK9/PhSLNM45KsBzzj5d+Z6n/Z7/wCZ1P8A2l/ziV4+A+r7dv4RsY243VduP+r6Ceg/wa8HarRvfdqa/J3qtaoWVicHJY7SQB2nbHft5ufLj6fsv+71KJiJ0eHbMREKTyW2zSDqurOtANOXAyHb8zNeOE57b/pPWpSOneGHPUtVdfQraa1bApYo2SxrxhcllOA3OBiefnxt6dfl9b+lc2HF9W53X2+rq+Z4/dCeCW26jXWaZW/CrVaV38jK81Bs9zjfwecHmdvSfFpp6WdQKqlc3NVWlabEyVVtzKD7Dd9+BOzw30TV6ZdXpDXv07rb5Nm9PjKlQCucjcNucjAK/XMi18LOvSmp1LV6Wxbzanm2IFbKBdpYEgZG/wCuR8pwkzxnb931eTP43NyXrss3hrvu2avn3/P4bureKOpabT12210jzSCrAE4G0nY654bsR9jmfHX77B1ih6kFlpqXapOAWZLRlj/dGcn6CRfjK3VnR6f8SaAgIFYrbc1gCH81iCVwBjt33e3Etmp6Je3VdPqhX+Slaqz7lGCEsGNpO7uR7RvLK67+jXDw49dmMtnJO3i+NT/DV0PxHrG1V2hvWoXhHasqCFDhQyhuTlCCD8/9If8Ah2uo/G6jHl43n8R377rP+F/5Z7+2JYNP0S8dZs1Zr/IZcB9ycnykX4c7u4PtObw50jV6XX3HyVfT3uxa0OvpXLspC5BzlgCMH6TWsuqb32tcMuTgnFyTj6ZcsMbrtrfuTv5nqedvv+Kwt/Crt2eTuHmZzuzlfL2e2M7s/pOenxBdoul02WrW7uK004XOBX5YKtb75AByB3yPvLB436TZqdI9VWDZlGAJxnackZPAOPnK9qvDuq1XTa6La1ov05UVgsCHrVAvqKltrHn9QPYzXJMpnbj+HL4nJwZfG48OXWpn3/Otdr+fPa38D+J9dpLKDrkpNN/vXkFPhzn2yNw45zzgy1+JtTbVprbadvmVrvwwyCq8tx/Tn9pT9V0XX696E1dKaemn4mDKxfONxAVjyQMfIZPJ7T0OwA5BGQcgj6HuJvj6rud9et+Xm+b9HC8eUmPV36pj3x1vt+3eeVD1/jWxenUalAhvtc1kEZGU3biFz74XH9U39W8R6oairQadam1JRTa7g7VYpvYADsAOcnPcCQ/RfBWpXV1rYn+6U22WIxdDntt9IO71FKsgj2MmfEPQ9TXrl6hpEW5iAHrZgufTsJySBgrt98gj3nKXls3d+v717ssPg48kwx6buZZS3xu37cbf2nq+2eh+I9VZbfobUqXWVqxrYZ2MRt+Ic8cqQR7ewMgf4WvahvceWumT1XZzuyqOV2e2O+ZYfCXQtR+Lt6hq1WqxwQtakNjO0ZJBIwFUAck8nOJxeEegarT236aykNpb9wa4MvA2uFIXdnnOMY4+0SZ24279/wBtmWfx8ePm48OnvMLfxv8A1dP516178OE+ONVYtmorbR1VoTtptceawAzwuQWOPljPYZl68P8AVBqtPXqANu8HK98MpKsM+4yDzKDpfDOr06vQNBpdXlspqH8s4BwOQxBxxnB7ZPeegdC0TU0JW4qDjJYUrsQEknCr/r795vhue/ueb+qY/FnHPoyee2rN617n/fd3RET1PhEREBERASodebGnuAzuLXVsduRtNwavPsCGtJB+rS3yG1Wi3V61QwHmPWMNnAYV1sCMe5O2Pc268XtW+m9RPlXXuWZlrrYkjHNQBRVGfhDAc+/J+kvgOeRPPOmdOcpfS7EF1YgH+QcFQcfXkj6y+6Eg11kdti9/sO8njK6a5Z2lb4iJXAiIgIiICIiAiIgZiIhoiJBr4pp/Nyl6+QM27qmG30q4B+pVlIH1gk2nJz6/RV3VtVagsRu6n/7kH6iYPUKgnmedXsB27967d2cbd2cZz7TV1PqiUeWGDsbWKItalyWCM5wB/wBKsf0kulxtllnlFaHwNoanFi05YHI3OzAH2OCcH9cyxkyJp8Q0vsKlir+WFO3HqtaxApU+pWDIwOQMfvjo0HVqbVqdLF/OQWVqxCsyEZyEPPaZxxxx8OvNzcvLd8mVv83buiaadXWyllsRlXuysCBwG5IOB6SD9iDOLVdfoRqF3iw6h9lXlsrbscs2c42j3/QAE8TTjpJxIjWeI6arHrfzB5ewO4rYonmAFd7gYUcjk8D3xJBtZWGZTYgZBuZSygqv95hnIX6mDVb4nPVr6mIVba2Y7gArqSSnxAAHkj3+ULrqirMLayqEh2DrhSO4c5wpH1gdETnGuq9I82vLjK+tfUME5XnkYDdvkZ8//wCjTs83zqvLzjfvXbntjdnGc+0pp0xNf4hP76/EE+IfEQCF/qII478ibIZIiICIiAiIgIiICQerfP4hecrdSwx8/IXOT7DAk5Iq7SE/iiTsVmqO48DAr2n7n6fMiZydeL9SG0Df7yR33Ak/qQZOeHLN2mrJ745+hyeP0lY0rMLwcbgccqGI5HPO3Gf27Sx+G1ISxTj03XAY/uliV/wIknl05f0paIibeYiIgIiICIiAiIgZiIhole1/h1rE16b1H4zbjIPpxTXUd3z+Anj5ywxIS6VTX+E2a17q2QZvNy1nci4bTV0EZTs2VJyAchiPfI6tR4Z31aKnzCi6UjPlNZUSBQ9QFbht6DLDuxOBgkywxGl6qrR8KhbleoqlSDSAIdzH/d7NQ7ZY5JLeb3POQSZw6Pwhcn4ZTbWVo/B8gFSfwwwy4HxbuSCxOM4x7y5xGl6qrlfhjHTU0AZFZUqBYL6WetkY714LK5XDDuQTMaHw4y3Je7V7vPtvZEB2r5lC0ha8/wBIYkgZJPEskRpOqq31Xw/da2qQW1pTqxWlh2szqipscJztyRnBOcZzg9pw6zwWznUDzFxb+MKMxsLK2qR02lQdu1d3fnIVeARmXKI0vVVWPhL81rAyJm+q4bVwVVNJ+HKqR2OcsPvOajwhYFXL0bqk0laKqEJYNI7OGuHfLZ4AztIz6u0uURo6qq/+zDnzXzp0ss0z0LspGxHey6wsEbIZT5i5z8RBJHOJz0eFLUY2hqXfzWtFdm90w+nroILHncNuQcdmZcDPFwgxpOqqlo+gsNcjbQKKqqnbagrRtUlbUq1K5OFFLEEHO3YgBPMtkRDNuyIiVCIiAiIgIifNj47Kzn2CjJP+g+5wJFk2+proY+bYmRhq1Iz2yGYHP05WcK9ZTcEdTWScDJU8ngZ2k459+01dQ1W244PKpQSPpZft/wBDJbuOvHLMu6Gt07rqALEqQ4HNahO4z7dx+v6Sa6G2Gvrzkhw/1xaN37A7gPtInrzE2Vt/eRT9zucEf4CdHTnxrFbPF2nI/wDKmzI/wsb9hMzy65z7askRE6PIREQEREBERAREQMxEQ0REQEREBERAREQEREBERAQYgwjEREIREQEREBPmxwoLMQoHJJOAB8yT2mXYAEkgAckngADuSflIZ9fvV7cbqxxWoG4nkbbCP7ztgIBzj1e4AlreGHVXbV1FLCVrcNtQWMw9QCkkLt9iWIbH2P0zy9H6gx81/jY4StR8xuYn6Lgpz78H3xIpGbTi++4hG1DJtQsNyog2qXyfScYOOTnPz2iT8MdL/D1va7b3sXKr221jaPTuH9BJPyHAzMV6ccJirj8O2/Z2IcBzZkNw2Qo3DgjnGO3IxiffTLn1F2qtxYyltIq7wB6K7EsIAXtwScHn1Z+k7tRo6nvZdQdyjIDexGMrgg8dj27bR8+LFodHVTSzIqqlYO0AD6sTx3JJ7+8NaV7xG+SEx/w1CqQc5K8j7e3bM1Kp/wB11HOKS27HsliqP2yqfvNup0Nljs6nAJJw2xc++D6DuPfsR9xNNVoFGoRjgDT35z9FJB4J9xBpcIkL0nrlZ09D3OKi9aNmz0BiVzlWbhvc8E4kxVYGAZSGU9iDkH7ETcu3juNnl9RESskREBERAREQMxEQ0REQEREBERAREQEREBERAQYgwjEREIREQEREDTqq9wVSMgsmR8xnsfoTicfhmsDAYsHBZ9pxjJyO2MjAOAM9lHbiSCn8ytfmST9lUn/3t/afGnTGotJ4yAQfv8v2H7ffGL5eni/S4PMY+fWRu2MNpIzhXNh7/QADM6vEunylaqSBi2s/VTRacfuqH9JprtBsuUcMQoP67+ftkmS+up3BMkgq3tj+ZHT3+jGR1VfSaVbG3OOFCn5HsCP095Z6UDI9Y4zuHHtnnI+2ZVab/wAxT7MoU/oNvH0yJOdKuJLjsSOP6gMH/Q/rAhkuyTgbFWmvgezOgbH+J/wkFbUbDbTk4sRq/l8YxgH24zz9ZN6TBFrD4WcgfVV9IP7CR/VKvLO4fMDP0OeYHX0/rFR09VJ2fk0hG8wD4vStIYEY5XLcg8jscGd/RK1qc1Vu1iFTZyMAPuG7YuPSp3D09hj6mVBuiP8AidLduBoua0FRnO6iu0Ju/wDHj/x9s4Ex0XVsNbWp+B6rVH9SMjf+iB+0Rjkm8auERE6PIREQEREBERAzERDRERAREQEREBERAREQEREBBiDCMRIvXdfpqR7GJIrdKm24JD2Mqgd/mwyO4+U79XqFqR7XYKiKzMx7BVGST+kmzVbYmui9XAZTwQrfIgMMjI7jj5z7JxyeBBpmJrS3LFSpUgA8lckHPOASQOPcCcPVeu0acL5j5Z22oiAuzN2wqrzG16bvTsVvz0H/AMd5H3Bq/wBCZ826wFVx8W1sn5BWUEff1CQ3UOtqLgVRydO1TlgAVsrvUqQmOWwDk4H8o98Z06hc335A5rYKCeRuBY147Z+EnGecjPpmK9HHPtbtRYQ6uO+dv3GMgfvn9ZY9bqgakdeckEAdz9B9ZXbKx5Y5wMhgQANoJyAAOMKCB9lkbpNQ1VDkgl1tAITAJOK+RkAZPxNwBksPrDo6tcu0j+Xadnt7AD2/WdVGrGW75ZQVx7MPf9gZzX6fcikHAbDZP/UM84+//wDZG6fVflVglkdmWssCrlSyqWZSBhhy+3jsVyBgiVXbor8LsIxt5/Sbutr6D9B/hkSL6/eAFdGBB8s+kE5SwPsfPsAVQe/x+2J2dR1zKVHltaGOCUGQi+7v9M44Az/rBA9T6kyPo62ICKNS7ZzwbWwufsu7/GbOmanfrdLgcLbZnnsGpsIU/M5VSfkcD2zN+m6bRrEwd29TeVUDa29C+Ef3G3dnHOfrmc/SqkQo6210GtfMrNrKC+4FFQZIy1gZ2JB4xWeMwzZuPSYlW8JdUVWOiIcbVW2p7LPMNqWFmJR/5wCeDgHHcAgyy1XKxYKwJU7Wx7HAOD+hE3Lt5MsbLpsiIlZIiICJw9T6zRp8efclW7ONzYzjvgRJuNTG3074iJQiIgIiICIiAiIgIiICIiAlJ8U9dvp6hTUt9VNAqS2wWlVDbrWQjcRnOMHjsAxl2lU8Tve+oFFVrVJ5Qew1+ljuawIrWclU9LEnjAB92Elb453ReiZ0ucLYrU2k22MtR223u3IDuCqBUCHG4Z75PqAw2usd7b3Fj2BzSqIWFY06ipmsDD0jdyC2T3yMgSW1uqWsV0my6upUGbVWxnwSd1jXLnkkDgHaCyklh6Rov8s7FoFr1hcLbgPsJYg21IxCFxt9L8kkucsVIPO4vTOyJs1d7WDUb7AowtYdxUhApYkgbsPuYg7sNhU44zOrQ6u9kVba9S5QBnuY7KygVgwcMQoO7B9XqwB9RJS+1LLE/C1MoWspba6suxE8vZUD3yQM4UjgEnE7+i0jWKr2AlVZWAYnGBtetVQEIDwjZwTtcLk5Jk6V2ggXrp8umpVe0Mpyyb2e6wBfNKAgMC2CSRjOAOBOY9MW+2lhUL7q9rseW3LlQ4bGAjBydoDErtwQORJLqCk3tqqKbDWhIa5iOWqNmSgsIZlBZu3HoUjntN9F0RpDvY5qewAA2FS2ysFnfHKr8Tcc4ABPOZZEQ3iovptNa9NoOrVRY2QAKq2f1mtclUYFuMk9mI95CaG+yzS6V23rbQ2GLekuayW2nPJGxmDN83Ud2bHTq+nLqaQ5VmTUlGQqccs7eQrE/EmFJz3wc9yZ8dX6jsstcOWXytMKuMgEapdwGB3Oa2cck/TiUbtXor/xpzqVStd48kkjKZYDCjkszFcHHGa+eVm52Fuo1Knt51Q9I+F9r1Flz3xbsxn5CT3XtLWbDY6utYqem25dgCAFXS3JOcoyn24yCeBI1fAjrYdSt6tqOdrMh2Y9JH5YOQxYZJDYz/L7QIJdLqa9ZVU9jqrfkVptsHarhyMFdqkBjtJxk7jxmfHiOyvTsNON1SLdVWpOSV3VcljySR6fcn1Zlr05U65GDnUX7GV7QvpRS2XVBnai+lRxk/ctkc/SujV6y7U2ahSduocFCSpwBUaicYPwqB/4j65Cu9SF7rp009YcWrvcnYAiWYDICSCdju+ADwOMGd34jOqqNb7FdODyQT+Y9e7HcC1U+/b3k/VQTpUSqkMfP1DYUABCl1pwDwF9WB9syp6gmu8BWNbUsQGGOMubFwP5gxs24+SnIga6upW6XUBtjotlt1lCOSfTvItquJGUwSWGc8EfYz+o6AnUdOjVha082y4qSVZbvUrKXAO5SxBHYgAAcYx1+JdKLtCursqVNStVZYgcoCVNqZ77R6u/bE4v4et+bjn4bBweDzWeR8xzg/8AVA2/7PLbjSlzXfpUqam3HLH/APJ3zgkKGAPt9FIa+q5g/wCGVBdvFnluqAu67RZVYSNrHaMZOCU5DH3nPFKvWa9RWpZx+TwOcWsAADg7QW25J7EL9ZV9brWXNltgrYIvrqANdTqSVUFifNOA43N3K8YwTGh2U6l7LKg7PpFoG6+nBI3MqsimwgYRWD+r4WHYnnGeneJnP4g3LQorRbavLtDb1bcAGPsdwUdhye3YmkaLWW6fq1q6m5rmBCWWe4TK7LVwNqKAVPPpAz74M9C1PSlt3JZtDowXzBtwNwBDMHw5DDnG5xkfTERi4SsV+IAulS+4LWxUs6lxhSCFKbv5juZQMDnOeBFmsse2u+lnelUbzaQoJ5wRYP5twGeBkHGO5lZ6x0wFqrbVP5b7bCuqcFHyPKc+argJw2CWwc8Y7To6ZRp9MbKHSvc1nn06gDzAVPlm1VsOfUFGcdj29sm7SceLbfu8vza7aQWYFVcY/LK5Uk52lsbAcd+T84kvRoSrFGrW4HdZXZVcaxsZssgGcEK5PbsGURMdMdepYIiJ2eIiIgIiICIiAiIgIiICIiAkXptOj6+3eivjS0kbgDg+bqORnt7REzk3x/qaQdl+rCegCmsgL6QDtu5AHv2nD0Jz5V3J7If8GP8A7JP6mImXpfPh7R1tVRurRs1191B+Iru/fJz88zsc/l6c++dY2f8AqFdoDffBPP1iIEX1q0iukAkBV05UA4x+UTx8uQD9xITxHqnbRB2dmYtpkLFiSVcNuUk87Txke8RAk7ECppXUBXL3IWAwSqVWbFJHO1cLge2BN3VKwVoyAcbu4/8Ak1A/9RECR6wgbpj2MAztpLizMMsSKmwWJ5JlrsY+bUM8FX4+xrx/7P7xEI8s0GssBKixwvnXDAY4x5zjGPtiWvoCAG1AAFN7gqOARvv4I7ew/YREK136h10mqKuykHVEEEjB86zkY9557dcwuJDMCWViQTy3lk5PzOWY5+piIHpyemvQBfTnCHHGVKAlTjuuQOPpKl0Vips2nbirUYxxjFBxjH2H7CZiQh03V2O9oex3FZqKbmLbD5yrlM/CdvHHtxJXxigA16gAD8O74AwNyCjY2P7y+x9oiUaevMfP09efQ6epfZtqrt3Dsce2e0s1NC4J2rn8JT7D234/aZiBQvDB/m930l24+7ehz6j78gd5z9S506E8la9IVJ7gjTFgQfY7mY/difeIgXbqWnRtHQzIrMwrLMQCSdh5JPcxEQP/2Q==" 
        alt="Right to Vote" 
        className="vote-image"
      />


        {/* Light animated floating elements */}
        <div className="floating-icons">
          <img src="https://w7.pngwing.com/pngs/1001/200/png-transparent-voting-election-computer-icons-electoral-symbol-politics-politics-people-logo-voter-suppression-thumbnail.png" className="float-icon" alt="" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Election_Commission_of_India_Logo.svg" className="float-icon" alt="" />
        </div>
      </div>

      {/* RIGHT SIDE — LOGIN CARD */}
      <div className="right-panel slideUp">

        {/* Step 1: Email + Password */}
        {!captchaStage && (
          <div className="login-card glass-effect">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-sub">Login to continue voting</p>

            <form onSubmit={handlePasswordLogin}>
              <input
                type="email"
                className="login-input"
                placeholder="Email"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                type="password"
                className="login-input"
                placeholder="Password"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <button className="login-btn">Next →</button>
            </form>
          </div>
        )}

        {/* Step 2: Captcha Verification */}
        {captchaStage && (
          <div className="login-card glass-effect">
            <h2 className="login-title">Verify Captcha</h2>

            <div className="captcha-container">
              <div className="captcha-box">{captcha}</div>
              <button className="captcha-refresh" onClick={generateCaptcha}>↻</button>
            </div>

            <input
              className="login-input"
              placeholder="Enter Captcha"
              onChange={(e) => setCaptchaInput(e.target.value)}
            />

            <button className="login-btn" onClick={handleCaptchaVerify}>
              Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;
