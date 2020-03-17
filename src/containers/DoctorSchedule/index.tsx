import React from "react";
import {
    Button,
    Divider,
    Popconfirm,
    Table,
    Form,
    Modal,
    Input,
    Select,
    Col,
    Row, Spin, DatePicker, Tag
} from 'antd';
import {connect} from 'react-redux';
import {queryDoctorSchedule, updateScheduling,queryPatientRecord} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";
import moment from "moment";
import {UTIL, utils} from "../../utils/utils";
import style from './style.scss';

const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;

interface DoctorScheduleOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface DoctorScheduleStateProps {
    loading?: any,
    scheduleList?: any,
    patientRecord?: any,
}

interface DoctorScheduleDispatchProps {
    queryDoctorSchedule?: Function,
    updateScheduling?: Function,
    queryPatientRecord?: Function,
}

interface DoctorScheduleState {
    modalVisible?: boolean;
    currentScheduleId?: number;
    registerMedicalModalVisible?: boolean;
    patientRecordModalVisible?: boolean;
    currentRecord?: any;
}

@(connect(
    (state: any) => (
        {
            loading: state.doctorScheduleReducer.loading,
            scheduleList: state.doctorScheduleReducer.scheduleList,
            patientRecord: state.doctorScheduleReducer.patientRecord,
        }
    ),
    (dispatch: any) => (
        {
            queryDoctorSchedule: (param: any) => {
                dispatch(queryDoctorSchedule(param));
            },
            updateScheduling: (param: any) => {
                dispatch(updateScheduling(param));
            },
            queryPatientRecord: (param: any) => {
                dispatch(queryPatientRecord(param));
            }
        }
    )
) as any)
class DoctorSchedule extends React.Component<DoctorScheduleStateProps & DoctorScheduleDispatchProps & DoctorScheduleOwnProps, DoctorScheduleState> {
    private userData = JSON.parse(localStorage.getItem("userData"));

    constructor(props: DoctorScheduleStateProps & DoctorScheduleDispatchProps & DoctorScheduleOwnProps) {
        super(props);
        this.state = {
            modalVisible: false,
            currentScheduleId: 0,
            registerMedicalModalVisible: false,
            patientRecordModalVisible: false,
            currentRecord: {},
        }
    }

    componentDidMount() {
        this.props.queryDoctorSchedule({doctorid: this.userData.doctorid});
    }

    handleSearch = () => {
        const values: any = this.props.form.getFieldsValue();
        let param: any = {};
        if (values.date) {
            param.date = utils.formatDateTime(values.date);
        }
        this.props.queryDoctorSchedule({
            doctorid: this.userData.doctorid,
            ...param
        });
    }

    handleConfirmPost = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                this.props.updateScheduling({
                    ...values,
                    schedulingId: this.state.currentScheduleId,
                    status: 3
                });
                this.setState({
                    modalVisible: false
                })
            }
        })
    }

    handleCancelPost = () => {
        this.setState({
            modalVisible: false
        })
    }

    handleRecordMedical = (id: number) => {
        this.setState({
            modalVisible: true,
            currentScheduleId: id
        })
    }

    registerMedical = (id: number) => {
        this.setState({
            registerMedicalModalVisible: true,
            currentScheduleId: id
        })
    }

    handleConfirmRegisterMedical = () => {
        const values = this.props.form.getFieldsValue();
        this.props.updateScheduling({
            schedulingId: this.state.currentScheduleId,
            status: 1,
            patientPhone: values.patientPhone
        })
        this.setState({
            registerMedicalModalVisible: false
        })
    }

    handleCancelRegisterMedical = () => {
        this.setState({
            registerMedicalModalVisible: false
        })
    }

    startVisit = (id: number) => {
        this.props.updateScheduling({
            schedulingId: id,
            status: 2
        })
    }

    queryPatientRecord = (record: any) => {
        this.props.queryPatientRecord({
            status: 3,
            patientid: record.patientid
        })
        this.setState({
            currentRecord: record,
            patientRecordModalVisible: true
        })
    }

    render() {
        const {scheduleList, form, loading, patientRecord} = this.props;
        const columns = [
            {
                title: '诊室',
                dataIndex: 'roomname',
            },
            {
                title: '挂号费',
                dataIndex: 'cost',
            },
            {
                title: '日期',
                dataIndex: 'date',
                render: (text: any) => (moment(text).format('YYYY-MM-DD'))
            },
            {
                title: '开始时间',
                dataIndex: 'starttime',
            },
            {
                title: '结束时间',
                dataIndex: 'endtime',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: ((_: any, record: any) => {
                    let status:any;
                    switch (record.status) {
                        case 0:
                            status = <Tag color="magenta">未预约</Tag>;
                            break;
                        case 1:
                            status = <Tag color="cyan">已预约</Tag>;
                            break;
                        case 2:
                            status =  <Tag color="green">就诊中</Tag>;
                            break;
                        case 3:
                            status = <Tag color="volcano">已过期</Tag>;
                            break;
                    }
                    return status;
                })
            },
            {
                title: '患者姓名',
                dataIndex: 'patientname',
                render: ((text: any, record: any) => {
                    if (record.status === 0) {
                        return <span>--</span>;
                    } else {
                        return <a onClick={() => this.queryPatientRecord(record)}>{text}</a>;
                    }
                })
            },
            {
                title: '操作',
                dataIndex: 'option',
                valueType: 'option',
                render: ((_: any, record: any) => {
                    let status: any;
                    switch (record.status) {
                        case 0:
                            status = <a onClick={() => this.registerMedical(record.schedulingid)}>现场挂号</a>;
                            break;
                        case 1:
                            status = <a onClick={() => this.startVisit(record.schedulingid)}>叫号</a>;
                            break;
                        case 2:
                            status = <a onClick={() => this.handleRecordMedical(record.schedulingid)}>录入电子病历</a>;
                            break;
                        case 3:
                            status = <span>--</span>;
                            break;
                    }
                    return <span>{status}</span>;
                })
            },
        ];
        const patientRecordColumns = [
            {
                title: '病人姓名',
                dataIndex: 'patientname',
            },
            {
                title: '就诊日期',
                dataIndex: 'date'
            },
            {
                title: '病人主诉',
                dataIndex: 'chiefcomplaint',
            },
            {
                title: '检查结果',
                dataIndex: 'examinationresult',
            },
            {
                title: '诊断结果',
                dataIndex: 'diagnosticresult',
            },
            {
                title: '医生意见',
                dataIndex: 'doctoropinion',
            }
        ];

        const formLayout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 15,
            },
        };

        return (
            <Spin spinning={loading}>
                <Form style={{marginTop: 20, marginBottom: 20}}>
                    <Row>
                        <Col span={6}>
                            <FormItem key="date" {...formLayout} label="日期">
                                {form.getFieldDecorator('date', {})(
                                    <DatePicker placeholder={"请选择日期"}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <Button type={"primary"} onClick={this.handleSearch}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Table dataSource={scheduleList} columns={columns}/>;
                <Modal
                    destroyOnClose
                    title="电子病历录入"
                    visible={this.state.modalVisible}
                    onOk={this.handleConfirmPost}
                    onCancel={this.handleCancelPost}
                >
                    <FormItem key="chiefComplaint" {...formLayout} label="病人主诉">
                        {form.getFieldDecorator('chiefComplaint', {})(
                            <TextArea autoSize={{minRows: 3, maxRows: 5}}/>
                        )}
                    </FormItem>
                    <FormItem key="examinationResult" {...formLayout} label="检查结果">
                        {form.getFieldDecorator('examinationResult', {})(
                            <TextArea autoSize={{minRows: 3, maxRows: 5}}/>
                        )}
                    </FormItem>
                    <FormItem key="diagnosticResult" {...formLayout} label="诊断结果">
                        {form.getFieldDecorator('diagnosticResult', {
                            rules: [{
                                required: true,
                                message: '请输入诊断结果！'
                            }]
                        })(
                            <TextArea autoSize={{minRows: 3, maxRows: 5}}/>
                        )}
                    </FormItem>
                    <FormItem key="doctorOpinion" {...formLayout} label="医生建议">
                        {form.getFieldDecorator('doctorOpinion', {
                            rules: [{
                                required: true,
                                message: '请输入医生建议！'
                            }]
                        })(
                            <TextArea autoSize={{minRows: 3, maxRows: 5}}/>
                        )}
                    </FormItem>
                </Modal>
                <Modal
                    destroyOnClose
                    title="现场挂号"
                    visible={this.state.registerMedicalModalVisible}
                    onOk={this.handleConfirmRegisterMedical}
                    onCancel={this.handleCancelRegisterMedical}
                >
                    <FormItem key="patientName" {...formLayout} label="患者姓名">
                        {form.getFieldDecorator('patientName', {})(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem key="patientPhone" {...formLayout} label="患者手机号">
                        {form.getFieldDecorator('patientPhone', {})(
                            <Input/>
                        )}
                    </FormItem>
                </Modal>
                <Modal
                    className={style.patientRecordModal}
                    destroyOnClose
                    title="患者就诊记录"
                    visible={this.state.patientRecordModalVisible}
                    footer={null}
                    onCancel={() => {
                        this.setState({
                            patientRecordModalVisible:false
                        })
                    }}
                >
                    <Table dataSource={patientRecord} loading={loading}  columns={patientRecordColumns}/>
                </Modal>
            </Spin>

        );
    }
}

export const DoctorScheduleForm = Form.create()(DoctorSchedule);