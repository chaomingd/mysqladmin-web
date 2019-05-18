import React from 'react'
import {Layout,Menu,Breadcrumb} from 'antd';
import {observer,inject} from 'mobx-react'

const {Header,Content,Footer,Sider}=Layout;
const SubMenu=Menu.SubMenu;

@inject('databaseStore')
@observer
class App extends React.Component {
	state={
		collapsed: false,
	};
	componentDidMount() {
		this.props.databaseStore.getDatabases()
			.then(() => {
				console.log('success')
			})
	}
	onCollapse=collapsed => {
		console.log(collapsed);
		this.setState({collapsed});
	};

	render() {
		const { databases } = this.props.databaseStore;
		return (
			<Layout style={{minHeight: '100vh'}}>
				<Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
					<div className="logo" />
					<Menu theme="dark" mode="inline">
						{
							databases.map(database => {
								return <SubMenu
									key={database.Database}
									title={
										<span>{database.Database}</span>
									}
								>
									{/* <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item> */}
								</SubMenu>
							})
						}
					</Menu>
				</Sider>
				<Layout>
					<Header style={{background: '#fff',padding: 0}} />
					<Content style={{margin: '0 16px'}}>
						<Breadcrumb style={{margin: '16px 0'}}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{padding: 24,background: '#fff',minHeight: 360}}>Bill is a cat.</div>
					</Content>
					<Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default App