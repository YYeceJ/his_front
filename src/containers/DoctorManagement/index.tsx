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
    Row
} from 'antd';
import {connect} from 'react-redux';
import {queryDoctor, deleteDoctor, updateDoctor, addDoctor, queryDepartment, queryTitle} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";

const FormItem = Form.Item;
const {Option} = Select;

interface DoctorManagementOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface DoctorManagementStateProps {
    titleList?: any,
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
    queryTitle?: Function
}

interface DoctorManagementState {
    modalVisible?: boolean;
    modalFunction?: string;
}

@(connect(
    (state: any) => (
        {
            loading: state.doctorManagementReducer.loading,
            departmentList: state.doctorManagementReducer.departmentList,
            doctorList: state.doctorManagementReducer.doctorList,
            titleList: state.doctorManagementReducer.titleList
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
            },
            queryTitle: (param: any) => {
                dispatch(queryTitle(param));
            }
        }
    )
) as any)
class DoctorManagement extends React.Component<DoctorManagementStateProps & DoctorManagementDispatchProps & DoctorManagementOwnProps, DoctorManagementState> {

    constructor(props: DoctorManagementStateProps & DoctorManagementDispatchProps & DoctorManagementOwnProps) {
        super(props);
        this.state = {
            modalVisible: false,
            modalFunction: ""
        }
    }

    componentDidMount() {
        this.props.queryDepartment();
        this.props.queryTitle();
    }

    handleCancelAddDoctor = () => {
        this.setState({
            modalVisible: true,
            modalFunction: "add"
        })
    }

    handleUpdate = (record: any) => {
        this.setState({
            modalVisible: true,
            modalFunction: "update"
        }, () => {
            this.props.form.setFieldsValue({
                doctorName: record.doctorName,
                skilledField: record.skilledField,
                departmentName: record.departmentName,
                title: record.title,
                practiceExperience: record.practiceExperience
            })
        })
    }

    handleConfirmPost = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const param = {
                    doctorName: values.doctorName,
                    skilledField: values.skilledField,
                    departmentName: values.departmentName,
                    title: values.departmentName,
                    practiceExperience: values.practiceExperience
                }
                if (this.state.modalFunction === "update") {
                    this.props.updateDoctor(param);
                } else {
                    this.props.addDoctor(param);
                }
            }
        })
        this.setState({
            modalVisible: false
        })
    }

    handleCancelPost = () => {
        this.setState({
            modalVisible: false
        })
    }

    handleSearch = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const param = {
                    doctorName: values.doctorName_S,
                    departmentName: values.departmentName_S,
                    title: values.title_S,
                }
                this.props.queryDoctor(param);
            }
        })
    }

    render() {
        const {doctorList, form, departmentList, titleList} = this.props;
        const {modalVisible} = this.state;
        const columns = [
            {
                title: '头像',
                dataIndex: 'head',
                render: ((_: any, record: any) => (
                    <img src={record.head}/>
                ))
            },
            {
                title: '姓名',
                dataIndex: 'doctorName',
            },
            {
                title: '擅长领域',
                dataIndex: 'skilledField',
            },
            {
                title: '所在科室',
                dataIndex: 'departmentName'
            },
            {
                title: '职称',
                dataIndex: 'title',
                filters: titleList
            },
            {
                title: '执业经历',
                dataIndex: 'practiceExperience'
            },
            {
                title: '操作',
                dataIndex: 'option',
                valueType: 'option',
                render: (_: any, record: any) => (
                    <>
                        <a onClick={() => this.handleUpdate}>
                            修改
                        </a>
                        <Divider type="vertical"/>
                        <Popconfirm
                            title="确定删除这位医生？"
                            onConfirm={() => this.props.deleteDoctor(record.doctorId)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a href="#">删除</a>
                        </Popconfirm>,
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
            <div>
                <Form style={{marginTop:20,marginBottom:20}}>
                    <Row>
                        <Col  span={6}>
                            <FormItem key="doctorName" {...formLayout} label="姓名">
                                {form.getFieldDecorator('doctorName_S', {})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem key="departmentName" {...formLayout} label="所在科室">
                                {form.getFieldDecorator('departmentName_S', {})(
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        {
                                            departmentList && departmentList.map((item: any) => (
                                                <Option key={item.departmentId}
                                                        value={item.departmentId}>{item.departmentName}</Option>
                                            ))
                                        }
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem key="title" {...formLayout} label="职称">
                                {form.getFieldDecorator('title_S', {})(
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                    >

                                        {
                                            titleList.length > 0 && titleList.map((item: any) => {
                                                <Option key={item.titleId}
                                                        value={item.titleId}>{item.titleName}</Option>
                                            })
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
                <Button onClick={() => this.handleCancelAddDoctor} style={{marginBottom:20}} type={"primary"}>添加医生</Button>
                <Table dataSource={doctorList} columns={columns} pagination={"top"}/>;
                <Modal
                    destroyOnClose
                    title="医生管理"
                    visible={modalVisible}
                    onOk={() => this.handleConfirmPost}
                    onCancel={() => this.handleCancelPost}
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
                                style={{
                                    width: '100%',
                                }}
                            >
                                {
                                    departmentList && departmentList.map((item: any) => (
                                        <Option key={item.departmentId}
                                                value={item.departmentId}>{item.departmentName}</Option>
                                    ))
                                }
                            </Select>,
                        )}
                    </FormItem>,
                    <FormItem key="title" {...formLayout} label="职称">
                        {form.getFieldDecorator('title', {})(
                            <Select
                                style={{
                                    width: '100%',
                                }}
                            >

                                {
                                    titleList.length > 0 && titleList.map((item: any) => {
                                        <Option key={item.titleId} value={item.titleId}>{item.titleName}</Option>
                                    })
                                }
                            </Select>,
                        )}
                    </FormItem>,
                    <FormItem key="practiceExperience" {...formLayout} label="执业经历">
                        {form.getFieldDecorator('practiceExperience', {})(
                            <Input/>
                        )}
                    </FormItem>,
                </Modal>
            </div>

        );
    }
}

export const DoctorManagementForm = Form.create()(DoctorManagement);