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
    Row, Spin
} from 'antd';
import {connect} from 'react-redux';
import { deleteDepartment, updateDepartment, addDepartment, queryDepartment} from './actions';
import {RouteComponentProps} from 'react-router-dom';
import {FormComponentProps} from "antd/lib/form";

const FormItem = Form.Item;
const {Option} = Select;

interface DepartmentManagementOwnProps extends RouteComponentProps<any>, FormComponentProps {
}

interface DepartmentManagementStateProps {
    loading?: any,
    departmentList?: any,
}

interface DepartmentManagementDispatchProps {
    deleteDepartment?: Function,
    updateDepartment?: Function,
    addDepartment?: Function,
    queryDepartment?: Function
}

interface DepartmentManagementState {
    modalVisible?: boolean;
    modalFunction?: string;
    currentRecord?: any;
}

@(connect(
    (state: any) => (
        {
            loading: state.departmentManagementReducer.loading,
            departmentList: state.departmentManagementReducer.departmentList,
            doctorList: state.departmentManagementReducer.doctorList,
            titleList: state.departmentManagementReducer.titleList
        }
    ),
    (dispatch: any) => (
        {
            deleteDepartment: (param: any) => {
                dispatch(deleteDepartment(param));
            },
            updateDepartment: (param: any) => {
                dispatch(updateDepartment(param));
            },
            addDepartment: (param: any) => {
                dispatch(addDepartment(param));
            },
            queryDepartment: (param: any) => {
                dispatch(queryDepartment(param));
            }
        }
    )
) as any)
class DepartmentManagement extends React.Component<DepartmentManagementStateProps & DepartmentManagementDispatchProps & DepartmentManagementOwnProps, DepartmentManagementState> {

    constructor(props: DepartmentManagementStateProps & DepartmentManagementDispatchProps & DepartmentManagementOwnProps) {
        super(props);
        this.state = {
            modalVisible: false,
            modalFunction: "",
            currentRecord: {},
        }
    }

    componentDidMount() {
        this.props.queryDepartment();
    }

    handleAdd = () => {
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
                departmentName: record.name,
                introduction: record.introduction
            })
        })
    }

    handleConfirmPost = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const param = {
                    name: values.departmentName,
                    introduction: values.introduction
                }
                if (this.state.modalFunction === "update") {
                    this.props.updateDepartment({departmentId:this.state.currentRecord.departmentid,...param});
                } else {
                    this.props.addDepartment(param);
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
        if (values.departmentName_S) {
            param.name = values.departmentName_S;
        }
        this.props.queryDepartment(param);
    }

    render() {
        const { form, departmentList,loading} = this.props;
        const {modalVisible} = this.state;
        const columns = [
            {
                title: '科室名称',
                dataIndex: 'name',
            },
            {
                title: '科室介绍',
                dataIndex: 'introduction',
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
                            title="确定删除科室？"
                            onConfirm={() => this.props.deleteDepartment({
                                departmentId:record.departmentid
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
                <Form style={{marginTop:20,marginBottom:20}}>
                    <Row>
                        <Col  span={6}>
                            <FormItem key="departmentName_S" {...formLayout} label="科室名称">
                                {form.getFieldDecorator('departmentName_S', {})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <Button type={"primary"} onClick={this.handleSearch}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Button onClick={this.handleAdd} style={{marginBottom:20}} type={"primary"}>添加科室</Button>
                <Table dataSource={departmentList} columns={columns} />;
                <Modal
                    destroyOnClose
                    title="科室管理"
                    visible={modalVisible}
                    onOk={this.handleConfirmPost}
                    onCancel={this.handleCancelPost}
                >
                    <FormItem key="departmentName" {...formLayout} label="科室名称">
                        {form.getFieldDecorator('departmentName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入科室名称！'
                                },
                            ],
                        })(
                            <Input/>
                        )}
                    </FormItem>,
                    <FormItem key="introduction" {...formLayout} label="科室介绍">
                        {form.getFieldDecorator('introduction', {
                        })(
                            <Input/>
                        )}
                    </FormItem>
                </Modal>
            </Spin>

        );
    }
}

export const DepartmentManagementForm = Form.create()(DepartmentManagement);