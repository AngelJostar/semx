import Alpine from 'alpinejs';

const products = {
    salud: {
        label: 'GASTOS MÉDICOS',
        title: 'Gastos médicos',
        description: 'Conoce las opciones para cuidar tu salud y entiende qué cubre tu seguro.',
        points: [
            'Hospitales y médicos que te interesa considerar.',
            'Suma asegurada, deducible y coaseguro.',
            'Exclusiones, periodos de espera y condiciones de contratación.',
        ],
    },
    vida: {
        label: 'VIDA Y FAMILIA',
        title: 'Vida y familia',
        description: 'Explora opciones de respaldo económico para quienes más quieres.',
        points: [
            'Personas que dependen de ti y beneficiarios.',
            'Monto de protección y plazo que quieres considerar.',
            'Coberturas, exclusiones y condiciones del seguro.',
        ],
    },
    auto: {
        label: 'SEGURO DE AUTO',
        title: 'Seguro de auto',
        description: 'Encuentra opciones para tu vehículo y entiende sus coberturas y asistencias.',
        points: [
            'Características de tu vehículo y el uso que le das.',
            'Daños, robo, responsabilidad civil y asistencias.',
            'Deducibles, exclusiones y alcance de cada cobertura.',
        ],
    },
    empresa: {
        label: 'PROTECCIÓN EMPRESARIAL',
        title: 'Protección empresarial',
        description: 'Revisa alternativas para cuidar tu operación, tu patrimonio y tu equipo.',
        points: [
            'Actividad, tamaño y prioridades de tu empresa.',
            'Bienes, riesgos de operación y necesidades del equipo.',
            'Límites, exclusiones y condiciones de las alternativas.',
        ],
    },
};

Alpine.data('semxSite', () => ({
    currentYear: new Date().getFullYear(),
    guideCreated: false,
    guideType: 'salud',
    menuOpen: false,
    modalOpen: false,
    priority: '',
    selectedProduct: 'salud',
    triggerElement: null,

    get currentProduct() {
        return products[this.selectedProduct];
    },

    get guideProduct() {
        return products[this.guideType];
    },

    get guideTitle() {
        return this.guideType === 'salud'
            ? 'Mi salud · Gastos médicos'
            : {
                vida: 'Mi familia · Seguro de vida',
                auto: 'Mi auto',
                empresa: 'Mi empresa',
            }[this.guideType];
    },

    openGuide(product, triggerElement) {
        this.guideType = product;
        this.guideCreated = false;
        this.priority = '';
        this.modalOpen = true;
        this.menuOpen = false;
        this.triggerElement = triggerElement;
        this.$nextTick(() => this.$refs.guideDialog.showModal());
    },

    closeGuide() {
        if (this.$refs.guideDialog.open) {
            this.$refs.guideDialog.close();
        }
    },

    onGuideClosed() {
        this.modalOpen = false;
        this.$nextTick(() => this.triggerElement?.focus());
    },

    closeOverlays() {
        if (this.modalOpen) {
            this.closeGuide();
            return;
        }

        this.menuOpen = false;
    },

    createGuide() {
        this.guideCreated = true;
        this.$nextTick(() => document.getElementById('download-guide')?.focus());
    },

    resetGuide() {
        this.guideCreated = false;
        this.$nextTick(() => document.getElementById('guide-type')?.focus());
    },

    downloadGuide() {
        const content = [
            'SEMX SEGUROS MEXICANOS',
            'MI GUÍA PARA LA ASESORÍA',
            '',
            this.guideProduct.label,
            '',
            ...this.guideProduct.points.map((point, index) => `${index + 1}. ${point}`),
            '',
            this.priority.trim() ? `Mi prioridad: ${this.priority.trim()}` : '',
            '',
            'ENCUÉNTRANOS',
            'Avenida Paseo de la Reforma 509, colonia Cuauhtémoc.',
            'Ciudad de México.',
            '',
            'Esta guía es informativa; no es una cotización ni una póliza. No se ha enviado una solicitud ni registrado una cita.',
        ].join('\n');

        const blob = new Blob([`\uFEFF${content}`], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'SEMX_Mi_guia_de_proteccion.txt';
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
}));

window.Alpine = Alpine;

Alpine.start();
