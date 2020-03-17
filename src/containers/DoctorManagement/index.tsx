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
    Row, Spin, Tooltip
} from 'antd';
import {connect} from 'react-redux';
import {queryDoctor, deleteDoctor, updateDoctor, addDoctor, queryDepartment} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";
import style from "./style.scss";

const FormItem = Form.Item;
const {Option} = Select;

interface DoctorManagementOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface DoctorManagementStateProps {
    loading?: any,
    departmentList?: any,
    doctorList?: any,
}

interface DoctorManagementDispatchProps {
    queryDoctor?: Function,
    deleteDoctor?: Function,
    updateDoctor?: Function,
    addDoctor?: Function,
    queryDepartment?: Function
}

interface DoctorManagementState {
    modalVisible?: boolean;
    modalFunction?: string;
    currentRecord?: any;
}

@(connect(
    (state: any) => (
        {
            loading: state.doctorManagementReducer.loading,
            departmentList: state.doctorManagementReducer.departmentList,
            doctorList: state.doctorManagementReducer.doctorList,
        }
    ),
    (dispatch: any) => (
        {
            queryDoctor: (param: any) => {
                dispatch(queryDoctor(param));
            },
            deleteDoctor: (param: any) => {
                dispatch(deleteDoctor(param));
            },
            updateDoctor: (param: any) => {
                dispatch(updateDoctor(param));
            },
            addDoctor: (param: any) => {
                dispatch(addDoctor(param));
            },
            queryDepartment: (param: any) => {
                dispatch(queryDepartment(param));
            }
        }
    )
) as any)
class DoctorManagement extends React.Component<DoctorManagementStateProps & DoctorManagementDispatchProps & DoctorManagementOwnProps, DoctorManagementState> {

    constructor(props: DoctorManagementStateProps & DoctorManagementDispatchProps & DoctorManagementOwnProps) {
        super(props);
        this.state = {
            modalVisible: false,
            modalFunction: "",
            currentRecord: {},
        }
    }

    componentDidMount() {
        this.props.queryDepartment();
        this.props.queryDoctor();
    }

    handleAddDoctor = () => {
        this.setState({
            modalVisible: true,
            modalFunction: "add"
        })
    }

    handleUpdate = (record: any) => {
        this.setState({
            modalVisible: true,
            modalFunction: "update",
            currentRecord: record
        }, () => {
            this.props.form.setFieldsValue({
                doctorName: record.doctorname,
                skilledField: record.skilledfield,
                departmentName: record.departmentid + "//" + record.departmentname,
                practiceExperience: record.practiceexperience
            })
        })
    }

    handleConfirmPost = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const param = {
                    doctorName: values.doctorName,
                    skilledField: values.skilledField,
                    departmentName: values.departmentName.split("//")[1],
                    departmentId: parseInt(values.departmentName.split("//")[0]),
                    practiceExperience: values.practiceExperience,
                    doctorTitle: values.doctorTitle
                }
                if (this.state.modalFunction === "update") {
                    this.props.updateDoctor({doctorId: this.state.currentRecord.doctorid, ...param});
                } else {
                    this.props.addDoctor(param);
                }
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

    handleSearch = () => {
        const values: any = this.props.form.getFieldsValue();
        let param: any = {};
        if (values.doctorName_S) {
            param.doctorname = values.doctorName_S;
        }
        if (values.departmentName_S) {
            param.departmentid = values.departmentName_S;
        }
        this.props.queryDoctor(param);
    }

    render() {
        const {doctorList, form, departmentList, loading} = this.props;
        const {modalVisible} = this.state;
        const columns = [
            {
                title: '账号',
                dataIndex: 'account',
            },
            {
                title: '姓名',
                dataIndex: 'doctorname',
            },
            {
                title: '擅长领域',
                dataIndex: 'skilledfield',
                width: 200,
                render: (text: any) => (
                    <Tooltip title={text} >
                        <span className={style.text}>{text}</span>
                    </Tooltip>
                )
            },
            {
                title: '执业经历',
                dataIndex: 'practiceexperience',
                width: 200,
                render: (text: any) => (
                    <Tooltip title={text}>
                        <span  className={style.text}>{text}</span>
                    </Tooltip>
                )
            },
            {
                title: '所在科室',
                dataIndex: 'departmentname'
            },
            {
                title: '操作',
                dataIndex: 'option',
                valueType: 'option',
                render: (_: any, record: any) => (
                    <>
                        <a onClick={() => this.handleUpdate(record)}>
                            修改
                        </a>
                        <Divider type="vertical"/>
                        <Popconfirm
                            title="确定删除这位医生？"
                            onConfirm={() => this.props.deleteDoctor({
                                "doctorId": record.doctorid
                            })}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a href="#">删除</a>
                        </Popconfirm>
                    </>
                ),
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
                            <FormItem key="doctorName" {...formLayout} label="姓名">
                                {form.getFieldDecorator('doctorName_S', {})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem key="departmentid" {...formLayout} label="所在科室">
                                {form.getFieldDecorator('departmentName_S', {})(
                                    <Select
                                        allowClear={true}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        {
                                            departmentList && departmentList.map((item: any) => (
                                                <Option key={item.departmentid}
                                                        value={item.departmentid}>{item.name}</Option>
                                            ))
                                        }
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <Button type={"primary"} onClick={this.handleSearch}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Button onClick={this.handleAddDoctor} style={{marginBottom: 20}} type={"primary"}>添加医生</Button>
                <Table dataSource={doctorList} columns={columns}/>;
                <Modal
                    destroyOnClose
                    title="医生管理"
                    visible={modalVisible}
                    onOk={this.handleConfirmPost}
                    onCancel={this.handleCancelPost}
                >
                    <FormItem key="doctorName" {...formLayout} label="姓名">
                        {form.getFieldDecorator('doctorName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入医生姓名！'
                                },
                            ],
                        })(
                            <Input/>
                        )}
                    </FormItem>,
                    <FormItem key="skilledField" {...formLayout} label="擅长领域">
                        {form.getFieldDecorator('skilledField', {})(
                            <Input/>
                        )}
                    </FormItem>,
                    <FormItem key="departmentName" {...formLayout} label="所在科室">
                        {form.getFieldDecorator('departmentName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择医生所在科室！',
                                },
                            ],
                        })(
                            <Select
                                allowClear={true}
                                style={{
                                    width: '100%',
                                }}
                            >
                                {
                                    departmentList && departmentList.map((item: any) => (
                                        <Option key={item.departmentid}
                                                value={item.departmentid + "//" + item.name}>{item.name}</Option>
                                    ))
                                }
                            </Select>,
                        )}
                    </FormItem>,
                    <FormItem key="practiceExperience" {...formLayout} label="执业经历">
                        {form.getFieldDecorator('practiceExperience', {})(
                            <Input/>
                        )}
                    </FormItem>
                </Modal>
            </Spin>
        );
    }
}

export const DoctorManagementForm = Form.create()(DoctorManagement);