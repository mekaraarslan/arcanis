import "./Ticket.css";
import { Select, Space, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaWallet } from "react-icons/fa";
import { BsFillRocketTakeoffFill, BsFillArrowDownCircleFill } from "react-icons/bs";
import { BsCreditCard2Back, BsCashCoin, BsPeople, BsStopwatchFill, BsCoin, BsGeoAlt, BsFillClockFill, BsFillLockFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import APImanager from '../../apiManager';
import { fetchPlanetsGet } from "../../services/PlanetService";
import { checkToken } from "../../services/authService";

export default function Ticket() {

    const [planetData, setPlanetData] = useState([]);
    const { RangePicker } = DatePicker;
    const baseUrl = APImanager.getBaseURL();

    function toggleAdditionalInfo(event) {
        const additionalInfo = event.currentTarget.nextElementSibling;
        additionalInfo.classList.toggle('ticketPageBodyQuestionsBoxAdditionalVisible');
    }

    /* LOOKUPS */
    useEffect(() => {
        async function fetchPlanetData() {
            try {
                const url = `${baseUrl}/lookups/planets`;
                const data = await fetchPlanetsGet(url);
                setPlanetData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchPlanetData();
    }, []);
    /* LOOKUPS */

    return (
        <div className='ticketPageContainer'>
            <div className='ticketPageBody'>
                <div className='ticketPageBodyPosition'>
                    <div className='ticketSearch'>
                        <Space wrap>
                            <Select
                                className="selectDeparture"
                                suffixIcon={<BsGeoAlt />}
                                defaultValue="Kalkış Noktası"
                                bordered={false}
                            >
                                {planetData.map(planet => (
                                    <Select.Option key={planet.id} value={planet.id}>
                                        {planet.displayName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Space>
                        <Space wrap>
                            <Select
                                className="selectArrival"
                                suffixIcon={<BsGeoAlt />}
                                defaultValue="Varış Noktası"
                                bordered={false}
                            >
                                {planetData.map(planet => (
                                    <Select.Option key={planet.id} value={planet.id}>
                                        {planet.displayName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Space>
                        <Space>
                            <RangePicker bordered={false} placeholder={['Gidiş Tarihi', 'Dönüş Tarihi']} />
                        </Space>
                        <Link className='ticketBtnStyle'>
                            <button>Seyahat Bileti Bul</button>
                        </Link>
                    </div>
                    <div className='ticketDescription'>
                        <h1>Uzayın Derinliklerine Yolculuk</h1>
                        <div className='deskBoxContainer'>
                            <div className='descBox'>
                                <TfiHeadphoneAlt />
                                <p>7/24 Müşteri Hizmetleri</p>
                            </div>
                            <div className='descBox'>
                                <BsCreditCard2Back />
                                <p>Güvenli Ödeme</p>
                            </div>
                            <div className='descBox'>
                                <BsCashCoin />
                                <p>Komisyon Yok, Ücretsiz</p>
                            </div>
                            <div className='descBox'>
                                <BsPeople />
                                <p>Ayda 25 Milyondan Fazla Ziyaretçi</p>
                            </div>
                            <div className='descBox'>
                                <BsStopwatchFill />
                                <p>İki Dakikada Biletini Al</p>
                            </div>
                            <div className='descBox'>
                                <BsCoin />
                                <p>İptal Edilen Bilete Kesintisiz İade</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='ticketPageBodyTitle'>Uzay Seyahati için Renta Rocket</h1>
            <div className='ticketPageBodyContent' >
                <div className='ticketPageBodyContentInfoBox'>
                    <i className='ticketPageInfoIcon'><TfiHeadphoneAlt /></i>
                    <h3 className='ticketPageInfoTitle'>7/24 Müşteri Hizmetleri</h3>
                    <p className='ticketPageInfoDescription'>obilet.com ve obilet Mobil Uygulamaları üzerinden yapacağınız tüm işlemlerde müşteri hizmetleri ekibimiz 7/24 yanınızda. Bir tıkla Canlı Destek başlatabilir ve yardım alabilirsiniz.</p>
                </div>
                <div className='ticketPageBodyContentInfoBox'>
                    <i className='ticketPageInfoIcon'><BsCreditCard2Back /></i>
                    <h3 className='ticketPageInfoTitle'>Güvenli Ödeme</h3>
                    <p className='ticketPageInfoDescription'>Tüm otobüs bilet alımlarınızı ister evinizden, ister ofisinizden ya da dilerseniz cep telefonunuzdan kolay, hızlı ve güvenilir bir şekilde gerçekleştirebilirsiniz.</p>
                </div>
                <div className='ticketPageBodyContentInfoBox'>
                    <i className='ticketPageInfoIcon'><BsCashCoin /></i>
                    <h3 className='ticketPageInfoTitle'>Her Bütçeye Uygun</h3>
                    <p className='ticketPageInfoDescription'>obilet size tüm firmaların otobüs biletlerini sorgulama ve karşılaştırma imkanı sunar. Bu sayede bütçenize uygun otobüs biletini rahatlıkla bulabilir ve satın alabilirsiniz.</p>
                </div>
                <div className='ticketPageBodyContentInfoBox'>
                    <i className='ticketPageInfoIcon'><BsFillRocketTakeoffFill /></i>
                    <h3 className='ticketPageInfoTitle'>En Seçkin Firmalar</h3>
                    <p className='ticketPageInfoDescription'>obilet olarak en seçkin otobüs firmalarını sizler için bir araya topladık. Tüm firmaların otobüs biletlerini obilet'te karşılaştırabilir, uygun otobüs biletini bulabilir ve online alabilirsiniz</p>
                </div>
            </div>
            <h1 className='ticketPageBodyQuestionsTitle'>Sıkça Sorulan Sorular</h1>
            <div className='ticketPageBodyQuestions'>
                <div className='ticketPageBodyQuestionsBox'>
                    <h3>Arcanis'de hangi roketler bulunuyor?</h3>
                    <i className='ticketPageBodyQuestionsBoxSvg' onClick={toggleAdditionalInfo}><BsFillArrowDownCircleFill /></i>
                    <div className='ticketPageBodyQuestionsBoxAdditional'>
                        Arcanis'de  SpaceX, Blue Origin, Virgin Galaactic gibi Evrenin dört bir yanına seferler düzenleyen yüzlerce Uzay Seyahati firmasına ulaşabilirsiniz.
                    </div>
                </div>
                <div className='ticketPageBodyQuestionsBox'>
                    <h3>Arcanis'de biletini nasıl satın alabilirim?</h3>
                    <i className='ticketPageBodyQuestionsBoxSvg' onClick={toggleAdditionalInfo}><BsFillArrowDownCircleFill /></i>
                    <div className='ticketPageBodyQuestionsBoxAdditional'>
                        Arcanis'den Roket bileti satın almak için web sitemizi veya mobil uygulamalarımızı kullanabilirsiniz. Seyahat etmek istediğiniz yeri ve tarihi girdikten sonra tüm seferleri karşılaştırabilir, size uygun sefer için yolcu ve kart bilgilerinizi girerek biletinizi satın alabilirsiniz.
                    </div>
                </div>
                <div className='ticketPageBodyQuestionsBox'>
                    <h3>Arcanis'de bilet satın alırken komisyon ödenir mi?</h3>
                    <i className='ticketPageBodyQuestionsBoxSvg' onClick={toggleAdditionalInfo}><BsFillArrowDownCircleFill /></i>
                    <div className='ticketPageBodyQuestionsBoxAdditional'>
                        Arcanis komisyon ücreti almaz. Arcanis'i kullanarak otobüs bileti alırken sadece biletinizin fiyatını ödersiniz.
                    </div>
                </div>
                <div className='ticketPageBodyQuestionsBox'>
                    <h3>Arcanis'de biletimi iptal edilebilir miyim?</h3>
                    <i className='ticketPageBodyQuestionsBoxSvg' onClick={toggleAdditionalInfo}><BsFillArrowDownCircleFill /></i>
                    <div className='ticketPageBodyQuestionsBoxAdditional'>
                        Roket biletinizi firmaların belirlediği iptal koşulları doğrultusunda iptal edebilirsiniz. İptal koşulları satın alma sırasında size bildirilir.
                    </div>
                </div>
                <div className='ticketPageBodyQuestionsBox'>
                    <h3>Arcanis'de bilet iadem ne zaman gerçekleşir?</h3>
                    <i className='ticketPageBodyQuestionsBoxSvg' onClick={toggleAdditionalInfo}><BsFillArrowDownCircleFill /></i>
                    <div className='ticketPageBodyQuestionsBoxAdditional'>
                        İptal işleminiz onaylandıktan sonra ücret iadesi, hiçbir kesinti olmadan bankanıza aktarılır. Ödediğiniz tutar bankanızın iade prosedürlerine bağlı olarak 7 iş günü içerisinde hesabınıza yansır. Bankamatik kartları ile yapılan işlemlerde bu süreç 1-20 iş gününü bulabilir. İade süreci tamamen bankanıza bağlıdır ve Arcanis'in müdahale etme hakkı yoktur.
                    </div>
                </div>
            </div>
            <div className='ticketPageFooterPromo'>
                <div className='ticketPagePromoContainer'>
                    <div className='ticketPagePromoContent'>
                        <h1>Arcanis</h1>
                    </div>
                    <div className='ticketPagePromoContent'>
                        <i><BsFillClockFill /></i>
                        <h3>En Hızlı</h3>
                    </div>
                    <div className='ticketPagePromoContent'>
                        <i><BsFillLockFill /></i>
                        <h3>En Güvenilir</h3>
                    </div>
                    <div className='ticketPagePromoContent'>
                        <i><FaWallet /></i>
                        <h3>En Ekonomik</h3>
                    </div>
                </div>
            </div>
            <div className='ticketPageFooterContainer'>
                <div className='ticketPageFooterInfoBox'>
                    <th className='ticketPageListGroup'>
                        <td className='ticketPageListHeader'>
                            Renta Rocket
                        </td>
                        <ul>
                            <li>
                                <a href='none'>En Ucuz Roket Biletleri</a>
                            </li>
                            <li>
                                <a href='none'>Bilet Al</a>
                            </li>
                            <li>
                                <a href='none'>Seyahatler</a>
                            </li>
                            <li>
                                <a href='none'>Uzay İstasyonları</a>
                            </li>
                        </ul>
                    </th>
                </div>
                <div className='ticketPageFooterInfoBox'>
                    <th className='ticketPageListGroup'>
                        <td className='ticketPageListHeader'>
                            Popüler Uzay Seyahati Firmaları
                        </td>
                        <ul>
                            <li>
                                <a href='none'>SpaceX</a>
                            </li>
                            <li>
                                <a href='none'>Blue Origin</a>
                            </li>
                            <li>
                                <a href='none'>Virgin Galactics</a>
                            </li>
                            <li>
                                <a href='none'>Nasa</a>
                            </li>
                        </ul>
                    </th>
                </div>
                <div className='ticketPageFooterInfoBox'>
                    <th className='ticketPageListGroup'>
                        <td className='ticketPageListHeader'>
                            Renta Rocket
                        </td>
                        <ul>
                            <li>
                                <a href='none'>Roket Bileti</a>
                            </li>
                            <li>
                                <a href='none'>Rezervasyon</a>
                            </li>
                            <li>
                                <a href='none'>Roket Kiralama</a>
                            </li>
                            <li>
                                <a href='none'>Hakkımızda</a>
                            </li>
                            <li>
                                <a href='none'>KVKK Aydınlatma Metni</a>
                            </li>
                            <li>
                                <a href='none'>Çerez Politikası</a>
                            </li>
                        </ul>
                    </th>
                </div>
                <div className='ticketPageFooterInfoBox'>
                    <th className='ticketPageListGroup'>
                        <td className='ticketPageListHeader'>
                            Bizi Takip Edin
                        </td>
                        <ul>
                            <li>
                                <a href='none'>Twitter</a>
                            </li>
                            <li>
                                <a href='none'>Facebook</a>
                            </li>
                            <li>
                                <a href='none'>Instagram</a>
                            </li>
                        </ul>
                    </th>
                </div>
            </div>
        </div>
    )
}
