import React from "react";
import AboutSimpleText from "./AboutSimpleText";

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container p-2">

                <AboutSimpleText header="ОРПОН">
                    <p className="lead">Отраслевое решение «паспортизация объектов недвижимости» - система управления адресной
                    информацией и информацией об объектах недвижимости</p>
                </AboutSimpleText>

                <AboutSimpleText header="Орпонизация">
                    <p className="lead"> Процесс получения глобального идентификатора системы ОРПОН (по простому: ГИД ОРПОН) для указанного адреса</p>
                </AboutSimpleText>

                <AboutSimpleText header='Сервис "Орпонизации"'>
                    <p className="lead"> Процедура изо дня в день орпонизирует предоставленные адреса</p>
                </AboutSimpleText>

                <AboutSimpleText header="Корректный формат адреса">
                    <p className="lead">Зачастую по переданному адресу даже человек не может определить где это, что уж говорить о "1 и 0",
                    по этому, что бы получить максимально достоверный результат, необходимо придерживаться определенного формата адреса:<br />
                        <span className="mx-5"><b>Область, район, населенный пункт, улица, дом</b></span><br />
                                Избегать посторонних слов, символов, цифр - которые никак не указывают на адрес.</p>
                </AboutSimpleText>

                <AboutSimpleText header="Орпонизация файлов">
                    <p className="lead">На главной страничке проекта можно орпонизировать файлы.
                    Для добавления файла следует воспользоваться соответствующей вкладкой. Файл можно выбрать при помощи стандартного диалога выбора,
                а так же просто перетащить его на форму.<br />Поддерживаемый формат: txt, csv.
                Возможная кодировка UTF-8 или windows-1251 (определяется автоматически)<br />
                Разделитель для столбцов: ";"<br />
                Файл может содержать (заголовки не нужны): "Идентификатор адреса ; адрес" или только "Адрес"<br /></p>
                    <table className="table table-bordered table-sm text-center">
                        <thead>
                            <tr>
                                <th scope="col">Идентификатор и адрес</th>
                                <th scope="col">Только адрес</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1 ; Адрес</td>
                                <td>Адрес</td>
                            </tr>
                            <tr>
                                <td>2 ; Адрес</td>
                                <td>Адрес</td>
                            </tr>
                            <tr>
                                <td>3 ; Адрес</td>
                                <td>Адрес</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="lead"> Идентификатор должен быть целочисленным числом, уникальным для каждого адреса.</p>
                </AboutSimpleText>

                <AboutSimpleText header="Орпонизация буфера обмена">
                    <p className="lead">На главной страничке проекта так же можно орпонизировать данные из буфера данных<br />
                        Данные должны иметь формат как и в предыдущем пункте, где мы орпонизировали файлы</p>
                </AboutSimpleText>

                <AboutSimpleText header="API">
                    <h5>Орпонизация одиночного адреса - это GET запрос на адрес /get_globalid?address={`{требуемый адрес}`}</h5>
                    <div className="form-floating mx-5">
                        <textarea className="form-control p-1" style={{ height: "280px", width: "800px" }} defaultValue={`{
        Id: 1,
        GlobalId: 21904819,
        ParsingLevelCode: "FIAS_HOUSE",
        UnparsedParts: "",
        QualityCode: "UNDEF_05",
        CheckStatus: "VALIDATED",
        IsValid: true,
        Error: null,
        AddressOrpon: "630088, Новосибирская обл, Новосибирск г., Зорге ул., дом 1
}`} /></div>

                    <h5>Орпонизация списка адресов - это POST запрос на адрес /api/get_global_id</h5>
                    <p className="lead">И в ответ будет уникальный GIUD задачи, пример: deb74f17-d553-45ed-b45c-24cd5c9c3406.<br />
            Тело запроса при этом:</p>

                    <div className="form-floating mx-5">
                        <textarea className="form-control p-1" style={{ height: "110px", width: "800px" }} defaultValue={`[
        { "Id":"1","Address":"Новосибирск Зорге 1" },
        { "Id":"2","Address":"165150, Архангельская обл, Вельский р-н, Вельск г., Гайдара ул., дом 14" };
]`} /></div>

                    <h5>Получить статус выполняемой задачи - это GET запрос на адрес /api/get_global_id/status?id=&#123;уникальный GUID
            полученный ранее&#125; </h5>
                    <div className="form-floating mx-5">
                        <textarea className="form-control p-1" style={{ height: "130px", width: "800px" }} defaultValue={`{
    "message":"Я все завершил. Я КрасафчеГ!",
    "status":"COMPLETED",
    "dateStatus":"2021-02-07T07:44:38.768+00:00"
}`} />
                    </div>

                    <h5>Получить результат выполняемой задачи - это GET запрос на адрес /api/get_global_id/result?id=&#123;уникальный
                    GUID полученный
            ранее&#125; </h5>
                    <div className="form-floating mx-5">
                        <textarea className="form-control p-1" style={{ height: "620px", width: "800px" }} defaultValue={`[
    {
            Id: 1,
            GlobalId: 21904819,
            ParsingLevelCode: "FIAS_HOUSE",
            UnparsedParts: "",
            QualityCode: "UNDEF_05",
            CheckStatus: "VALIDATED",
            IsValid: true,
            Error: null,
            AddressOrpon: "630088, Новосибирская обл, Новосибирск г., Зорге ул., дом 1"
    },
    {
            "Id":2,
            "GlobalId":-1,
            "ParsingLevelCode":null,
            "UnparsedParts":null,
            "QualityCode":null,
            "CheckStatus":null,
            "IsValid":false,
            "Error":"Client received SOAP Fault from server: WsSearchAddrElByFullNamePortTypeImpl ошибка: #PON_0051 Please see the server log to find more detail regarding exact cause of the failure.",
            "AddressOrpon":null
    }
]`} />
                    </div>
                </AboutSimpleText>

                <AboutSimpleText header="API служебное">
                    <h5>Получить список компонентов сервиса - это GET запрос на адрес /orponing_service/all_services</h5>
                    <div className="form-floating mx-5">
                        <textarea className="form-control p-1" style={{ height: "400px", width: "800px" }} defaultValue={`[
    {
        "name":"Фоновый сервис орпонизации",
        "id":"orponing-service",
        "description":null,
        "isStartable":true,
        "icon":"server"
    },
    {
        "name":"Сервис для разбора адресов",
        "id":"orponing",
        "description":null,
        "isStartable":false,
        "icon":"server"
    };...и т.д.
]`} />
                    </div>

                    <h5>Получить статус компонента - это GET запрос на адрес /orponing_service/status?service= &#123;id требуемого
            компонента         &#125;</h5>
                    <div className="form-floating mx-5">
                        <textarea className="form-control p-1" style={{ height: "130px", width: "800px" }} defaultValue={`{
        "message":"Мне нечего делать",
        "status":"STOP",
        "dateStatus":"2021-02-01T04:08:56.886+00:00"
}`} />
                    </div>

                    <h5>Запуск компонента - это GET запрос на адрес /orponing_service/ &#123;id требуемого компонента         &#125;/start</h5>
                    <div className="form-floating mx-5">
                        <textarea className="form-control p-1" style={{ height: "130px", width: "800px" }} defaultValue={`{
        "message":"Мне недосуг",
        "status":"START",
        "dateStatus":"2021-02-01T04:43:49.423+00:00"
}`} />
                    </div>

                    <h5>Получить лог сервиса - это POST запрос на адрес /log</h5>
                    <div className="mx-5 mb-2">В ответ будет получен полный лог за текущий день простым текстом</div>

                    <h5>Получить список фалов архива - это GET запрос на адрес /log/files</h5>
                    <div className="mx-5 mb-2">["2021-02-10.0","2021-02-11.0","2021-02-13.0","2021-02-14.0"]</div>

                    <h5>Получить лог из архива - это GET запрос на адрес /log/read?file= &#123;имя требуемого файла&#125;</h5>
                    <div className="mx-5 mb-2">В ответ будет получен полный лог из указанного файла</div>

                    <h5>Очистить архив логов - это GET запрос на адрес /log/clear?password= &#123;пароль от операции&#125;</h5>
                    <div className="form-floating mx-5">
                        <textarea className="form-control p-1" style={{ height: "130px", width: "800px" }} defaultValue={`{
        "message":"Я все завершил. Я КрасафчеГ!",
        "status":"COMPLETED",
        "dateStatus":"2021-02-01T04:43:49.423+00:00"
}`} />
                    </div>
                </AboutSimpleText>
            </div >
        )
    }
}