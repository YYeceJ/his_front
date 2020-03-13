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
    Row, Spin, DatePicker
} from 'antd';
import {connect} from 'react-redux';
import {queryDoctorSchedule, startVisit, recordMedical, registerMedical} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";
import moment from "moment";

const FormItem = Form.Item;
const {Option} = Select;
const { TextArea } = Input;

interface DoctorScheduleOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface DoctorScheduleStateProps {
    loading?: any,
    scheduleList?: any,
}

interface DoctorScheduleDispatchProps {
    queryDoctorSchedule?: Function,
    startVisit?: Function,
    recordMedical?: Function,
    registerMedical?: Function,
}

interface DoctorScheduleState {
    modalVisible?:boolean;
    currentScheduleId?:number;
}

@(connect(
    (state: any) => (
        {
            loading: state.doctorScheduleReducer.loading,
            scheduleList: state.doctorScheduleReducer.scheduleList
        }
    ),
    (dispatch: any) => (
        {
            queryDoctorSchedule: (param: any) => {
                dispatch(queryDoctorSchedule(param));
            },
            startVisit: (param: any) => {
                dispatch(startVisit(param));
            },
            recordMedical: (param: any) => {
                dispatch(recordMedical(param));
            },
            registerMedical: (param: any) => {
                dispatch(registerMedical(param));
            },
        }
    )
) as any)
class DoctorSchedule extends React.Component<DoctorScheduleStateProps & DoctorScheduleDispatchProps & DoctorScheduleOwnProps, DoctorScheduleState> {

    constructor(props: DoctorScheduleStateProps & DoctorScheduleDispatchProps & DoctorScheduleOwnProps) {
        super(props);
        this.state = {
            modalVisible:false,
            currentScheduleId:0,
        }
    }

    componentDidMount() {
        // TODO doctorid
        this.props.queryDoctorSchedule({doctorid:1});
    }

    handleSearch = () => {
        const values:any = this.props.form.getFieldsValue();
        const param:any = {}
        if(values.date_S){
            param.date = moment(values.date_S).format('YYYY-MM-DD');
        }
        this.props.queryDoctorSchedule({doctorid:1},...param);
    }

    handleConfirmPost = () => {
        this.props.form.validateFields((err:any,values:any) => {
            if(!err){
                console.log("----values----", values);
                this.props.recordMedical(values);
            }
        })
    }

    handleCancelPost = () => {
        this.setState({
            modalVisible:false
        })
    }

    handleRecordMedical = (id:number) => {
        this.setState({
            modalVisible:true,
            currentScheduleId:id
        })
    }

    render() {
        const {scheduleList, form, loading} = this.props;
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
                render:(text:any) => (moment(text).format('YYYY-MM-DD'))
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
                    let status = "";
                    switch (record.status) {
                        case 0:
                            status = "未预约";
                            break;
                        case 1:
                            status = "已预约";
                            break;
                        case 2:
                            status = "就诊中";
                            break;
                        case 3:
                            status = "已过期";
                            break;
                    }
                    return <span>{status}</span>;
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
                            status = <a onClick={() => this.props.registerMedical(record.schedulingId)}>现场挂号</a>;
                            break;
                        case 1:
                            status = <a onClick={() => this.props.startVisit(record.schedulingId)}>叫号</a>;
                            break;
                        case 2:
                            status = <a onClick={() => this.handleRecordMedical(record.schedulingId)}>录入电子病历</a>;
                            break;
                        case 3:
                            status = <span>-</span>;
                            break;
                    }
                    return <span>{status}</span>;
                })
            },
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
                            <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
                        )}
                    </FormItem>
                    <FormItem key="examinationResult" {...formLayout} label="检查结果">
                        {form.getFieldDecorator('examinationResult', {})(
                            <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
                        )}
                    </FormItem>
                    <FormItem key="diagnosticResult" {...formLayout} label="诊断结果">
                        {form.getFieldDecorator('diagnosticResult', {
                            rules:[{
                                required: true,
                                message: '请输入诊断结果！'
                            }]
                        })(
                            <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
                        )}
                    </FormItem>
                    <FormItem key="doctorOpinion" {...formLayout} label="医生建议">
                        {form.getFieldDecorator('doctorOpinion', {
                            rules:[{
                                required: true,
                                message: '请输入医生建议！'
                            }]
                        })(
                            <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
                        )}
                    </FormItem>
                    <FormItem key="note" {...formLayout} label="备注">
                        {form.getFieldDecorator('note', {})(
                            <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
                        )}
                    </FormItem>
                </Modal>
            </Spin>

        );
    }
}

export const DoctorScheduleForm = Form.create()(DoctorSchedule);